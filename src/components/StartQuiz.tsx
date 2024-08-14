import { Button } from '@nextui-org/react'
import React, { useContext } from 'react'
import { StateContext } from '../Provider/context';

const StartQuiz = () => {
    const context = useContext(StateContext); // StateContext'ten gerekli state ve fonksiyonları almak için useContext kullanılır

    // Eğer context mevcut değilse, bir hata fırlatılır
    if (!context) {
        throw new Error("App must be used within a StateProvider");
    }

    const { startQuizFunction } = context; // Şu anki soru index'ini alır
    return (
        <div className=' flex flex-col justify-center w-full text-white gap-y-10'>
            <p className='text-4xl animate-pulse font-extrabold'>Welcome to Quiz App</p>
            <div className='mx-auto'>
                <Button color='success' size='lg' className='text-white font-bold text-xl' onPress={startQuizFunction}>Start Quiz</Button>
            </div>
        </div>

    )
}

export default StartQuiz 