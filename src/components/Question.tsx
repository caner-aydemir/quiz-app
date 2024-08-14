import React from 'react'
import { QuestionData } from '../interface/interfaces';
import Options from './Options';

type Props = {
    questionInfo: QuestionData | null, // Soru bilgilerini içeren prop tipi
}

// Question bileşeni, bir soruyu ve ilgili seçenekleri görüntüler
const Question: React.FC<Props> = ({ questionInfo }) => {

    const questionStyle = "font-semibold text-2xl leading-tight "; // Sorunun stilini tanımlar
    const question = questionInfo?.title; // Soru başlığını alır

    return (
        // Soru ve seçenekleri içeren ana div
        <div className='flex  xs:w-full  xs:p-2 flex-col w-full gap-y-10 mx-auto text-center overflow-hidden'>
            {/* Soru metnini gösterir */}
            <p className={questionStyle}>
                {question} ?
            </p>
            {/* Seçenekleri gösteren Options bileşeni */}
            <Options questionInfo={questionInfo} />
        </div>
    )
}

export default Question;
