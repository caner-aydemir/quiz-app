import { Button } from '@nextui-org/react';
import React, { useContext } from 'react'
import { StateContext } from '../Provider/context';
import { QuestionData } from '../interface/interfaces';

type Props = {
    questionInfo: QuestionData | null, // Soru bilgilerini içeren prop tipi
}

// Options bileşeni, soru seçeneklerini render eder
const Options: React.FC<Props> = ({ questionInfo }) => {
    const option = questionInfo?.options; // Soru seçeneklerini alır
    const context = useContext(StateContext); // StateContext'ten gerekli state ve fonksiyonları almak için useContext kullanılır

    // Eğer context mevcut değilse, bir hata fırlatılır
    if (!context) {
        throw new Error("Options bileşeni, StateProvider içerisinde kullanılmalıdır");
    }

    const { selectedOption, setSelectedOption, setSelectedAnswer, buttonDisabled } = context; // Context'ten alınan değerler

    // Seçenekleri etiketlemek için her seçeneğe bir harf ekler
    const labeledOptions = option?.map((opt, index) => {
        const label = String.fromCharCode(65 + index); // A, B, C, D gibi harfleri oluşturur
        return `${label}) ${opt}`; // Etiketli seçeneği döner
    });

    // Kullanıcı bir seçenek seçtiğinde çağrılan fonksiyon
    const getMyAnswer = (selectedOption: string, index: number) => {
        setSelectedOption(index); // Seçilen seçeneğin index'ini state'e kaydeder
        setSelectedAnswer(selectedOption); // Seçilen cevabı state'e kaydeder
    };

    return (
        // Seçenekleri render eden ana div
        <div className='flex flex-col text-start px-10 xs:px-0 gap-y-5'>
            {labeledOptions?.map((opt, index) => (
                <Button
                    isDisabled={buttonDisabled} // Eğer buttonDisabled true ise buton devre dışı bırakılır
                    size='lg'
                    key={index}
                    className={selectedOption === index ? 'bg-blue-500 font-bold' : 'bg-white'} // Seçilen seçenek mavi renkte ve kalın fontta gösterilir
                    style={selectedOption === index ? { color: 'white' } : {}}
                    onPress={() => getMyAnswer(opt, index)} // Butona tıklanınca getMyAnswer fonksiyonu çalıştırılır
                >
                    {/* Seçenek metnini gösterir */}
                    <p className='w-full whitespace-normal text-start break-words '>
                        {opt}
                    </p>
                </Button>
            ))}
        </div>
    )
}

export default Options;
