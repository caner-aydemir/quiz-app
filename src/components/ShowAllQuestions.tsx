import React, { useContext, useEffect } from 'react'
import useQuestion from '../hooks/useQuestion'
import Question from './Question'
import { Button, Spinner } from '@nextui-org/react'
import ProgressBar from './ProgressBar'
import { StateContext } from '../Provider/context'

// ShowAllQuestions bileşeni, sınavın tüm sorularını ve ilerleme durumunu görüntüler
const ShowAllQuestions: React.FC = () => {
    // Soruları, yüklenme durumunu ve hatayı almak için useQuestion hook'u kullanılıyor
    const { question, loading, error } = useQuestion();

    // Context'ten gerekli state ve fonksiyonları almak için useContext kullanılıyor
    const context = useContext(StateContext);

    // Eğer context mevcut değilse, bir hata fırlatılır
    if (!context) {
        throw new Error("ShowAllQuestions must be used within a StateProvider");
    }

    // Context'ten alınan değerler
    const { currentQuestionIndex, timeLeft, setTimeLeft, nextQuestion, buttonDisabled } = context;

    // Her 1 saniyede kalan süreyi azaltan bir interval ayarlanıyor
    useEffect(() => {
        if (question) {
            // Eğer süre biterse, bir sonraki soruya geçilir
            if (timeLeft === 0) {
                nextQuestion(question[currentQuestionIndex]);
                return;
            }
        }

        // Interval, her 1 saniyede bir timeLeft state'ini 1 azaltır
        const intervalId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        // Bileşen unmounted olduğunda interval temizlenir
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    // Sorular yükleniyorsa, yüklenme spinner'ı gösterilir
    if (loading) {
        return <div className='text-white w-full text-center p-20 top-24'><Spinner label="Loading..." labelColor='warning' color="warning" /></div>;
    }

    // Eğer bir hata oluşursa, hata mesajı gösterilir
    if (error) {
        return <div className='text-white w-full text-center p-20 top-24 text-3xl'>Something went wrong</div>;
    }

    // Eğer hiç soru yoksa, bilgilendirme mesajı gösterilir
    if (!question || question.length === 0) {
        return <div>No questions available.</div>;
    }

    return (
        // Soruları ve ilgili bilgileri içeren ana div
        <div className='flex flex-col w-2/3 xs:w-full mx-auto bg-gray-900 p-10 xs:p-5 xs:shadow-xl text-white h-full shadow-md gap-y-20 xs:gap-y-5 rounded-2xl items-center border-black'>
            <div className='w-full flex flex-col xs:h-3/4 xs:border gap-y-10'>
                {/* Sınav başlığı */}
                <p className='mx-auto text-3xl text-white font-bold'>Quiz App</p>

                {/* Mevcut soru durumu */}
                <p className='px-5 text-xl gap-x-2 gap-y-10 font-bold flex items-center justify-end'>
                    Question : <span className='text-green-600 text-medium'>{currentQuestionIndex + 1} / <span className={`${question?.length - 1 !== currentQuestionIndex && "text-red-500"}`}>{question.length}</span></span>
                </p>

                {/* İlerleme çubuğu */}
                <ProgressBar />

                {/* Şu anki soruyu gösteren bileşen */}
                <Question questionInfo={question[currentQuestionIndex]} />
            </div>

            <div>
                {/* Sonraki veya Bitir butonu */}
                <Button size="lg"
                    isDisabled={buttonDisabled}
                    className='text-white' color='success'
                    onClick={() => nextQuestion(question[currentQuestionIndex])}>
                    {currentQuestionIndex === question.length - 1 ? "Finish" : "Next"}
                </Button>
            </div>
        </div>
    )
}

export default ShowAllQuestions;
