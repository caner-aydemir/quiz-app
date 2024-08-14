import React, { createContext, useState, useEffect } from "react";
import useQuestion from "../hooks/useQuestion";
import { MyAnswerState, QuestionData } from "../interface/interfaces";

// StateContextType, state context'inin yapısını tanımlar
export type StateContextType = {
    startQuiz: boolean; // Quiz'in başlatılıp başlatılmadığını gösterir
    setStartQuiz: React.Dispatch<React.SetStateAction<boolean>>; // Quiz'i başlatma durumunu güncelleyen fonksiyon
    currentQuestionIndex: number; // Mevcut soru indeksini takip eder
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>; // Mevcut soru indeksini güncelleyen fonksiyon
    timeLeft: number; // Mevcut soru için kalan süreyi tutar
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>; // Kalan süreyi güncelleyen fonksiyon
    myAnswers: MyAnswerState[]; // Kullanıcının verdiği cevapları depolar
    setMyAnswers: React.Dispatch<React.SetStateAction<MyAnswerState[]>>; // Kullanıcının cevaplarını güncelleyen fonksiyon
    nextQuestion: (questionInfo: QuestionData) => void; // Bir sonraki soruya geçiş yapan fonksiyon
    selectedOption: number | null; // Seçilen seçeneğin indeksini tutar
    setSelectedOption: React.Dispatch<React.SetStateAction<number | null>>; // Seçilen seçeneği güncelleyen fonksiyon
    selectedAnswer: string | null; // Seçilen cevabın metnini tutar
    setSelectedAnswer: React.Dispatch<React.SetStateAction<string | null>>; // Seçilen cevabı güncelleyen fonksiyon
    buttonDisabled: boolean; // Butonun devre dışı olup olmadığını belirten bayrak
    startQuizFunction: () => void; // Quiz'i başlatma fonksiyonu
};

// Bileşenler arasında state yönetimini sağlamak için bir context oluşturuyoruz
export const StateContext = createContext<StateContextType | undefined>(undefined);

type StateProviderProps = {
    children: React.ReactNode; // Context'i kullanacak alt bileşenler
};

// StateProvider bileşeni, state'i yönetir ve alt bileşenlere sağlar
export const StateProvider = ({ children }: StateProviderProps) => {
    const [startQuiz, setStartQuiz] = useState(false); // Quiz'in başlatılıp başlatılmadığını gösteren state
    const { question } = useQuestion(); // Soruları almak için özel bir hook kullanılıyor
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Mevcut soru indeksini takip eden state
    const [timeLeft, setTimeLeft] = useState(30); // Her soru için geri sayım sayacını tutan state
    const [myAnswers, setMyAnswers] = useState<MyAnswerState[]>([]); // Kullanıcının cevaplarını depolayan state
    const [selectedOption, setSelectedOption] = useState<number | null>(null); // Seçilen seçeneği tutan state
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Seçilen cevabın metnini tutan state

    // Eğer 20 saniyeden fazla süre kaldıysa, buton devre dışı olur
    const buttonDisabled = timeLeft > 20 ? true : false;

    // Kullanıcının cevabını kaydedip bir sonraki soruya geçiş yapan fonksiyon
    const nextQuestion = (questionInfo: QuestionData) => {
        if (question && question?.length >= currentQuestionIndex + 1) {
            // Eğer bir cevap seçilmediyse, bunu "Empty" olarak kaydet
            if (selectedAnswer === null) {
                setMyAnswers([...myAnswers, { id: questionInfo.id, answer: "Empty", question: questionInfo.title }]);
            } else {
                // Seçilen cevabı kaydet
                setMyAnswers([...myAnswers, { id: questionInfo.id, answer: selectedAnswer, question: questionInfo.title }]);
            }
            // Bir sonraki soru için state'i sıfırla
            setSelectedAnswer(null);
            setTimeLeft(30);
            setSelectedOption(null);
            setCurrentQuestionIndex((prev: number) => prev + 1);
            localStorage.removeItem("timeLeft"); // Kalan süreyi localStorage'dan sil
            localStorage.removeItem("currentQuestionIndex"); // Mevcut soru indeksini localStorage'dan sil
        }
    };

    useEffect(() => {
        // Sayfa yüklendiğinde localStorage'dan veri al
        const getTimeLeft = localStorage.getItem("timeLeft");
        const getCurrentQuestion = localStorage.getItem("currentQuestionIndex");
        const storedAnswers = localStorage.getItem('myAnswers');

        if (getTimeLeft) {
            const lastTime = parseInt(getTimeLeft, 10);
            setTimeLeft(lastTime); // Kalan süreyi state'e ata
        }
        if (getCurrentQuestion) {
            const lastQuestion = parseInt(getCurrentQuestion, 10);
            setCurrentQuestionIndex(lastQuestion); // Mevcut soru indeksini state'e ata
        }
        if (storedAnswers) {
            const previousAnswers = JSON.parse(storedAnswers) as MyAnswerState[];

            // ID'lere göre mevcut ve önceki yanıtları birleştirip teke düşürün
            const answerMap = new Map<number, MyAnswerState>();

            // Mevcut yanıtları ekleyin
            myAnswers.forEach(answer => answerMap.set(answer.id, answer));

            // Önceki yanıtları ekleyin (öncelik sırasına göre son gelen yanıtı saklar)
            previousAnswers.forEach(answer => answerMap.set(answer.id, answer));

            // Map'ten tekrar bir dizi oluşturun ve durumu güncelleyin
            setMyAnswers(Array.from(answerMap.values()));
        }
    }, []);

    // Quiz'i başlatan ve localStorage'daki cevapları temizleyen fonksiyon
    const startQuizFunction = async () => {
        await localStorage.setItem("startQuiz", "true");
        await localStorage.removeItem('myAnswers'); // Önceki cevapları localStorage'dan sil
        setStartQuiz(true); // Quiz'i başlat
    };

    // State ve fonksiyonları alt bileşenlere sağlar
    return (
        <StateContext.Provider
            value={{
                currentQuestionIndex,
                setCurrentQuestionIndex,
                timeLeft,
                setTimeLeft,
                myAnswers,
                setMyAnswers,
                nextQuestion,
                selectedOption,
                setSelectedOption,
                selectedAnswer,
                setSelectedAnswer,
                buttonDisabled,
                startQuiz,
                setStartQuiz,
                startQuizFunction
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
