import React, { useState, useEffect } from 'react'
import { QuestionState, QuestionData } from '../interface/interfaces';

// splitTextIntoOptions fonksiyonu, verilen metni satırlara bölerek 4 seçenek haline getirir
// Eğer metin 4 satırdan az ise, boş satır ekler
const splitTextIntoOptions = (text: string): string[] => {
    const parts = text.split('\n'); // Metni satırlarına böler
    while (parts.length < 4) {
        parts.push(""); // Eğer 4'ten az satır varsa, boş satır ekler
    }
    return parts;
}

// useQuestion özelleştirilmiş hook'u, soruları almak ve yönetmek için kullanılır
const useQuestion = () => {
    // State'i tanımlıyoruz: questions başlangıçta null, loading true ve error null
    const [questions, setQuestions] = useState<QuestionState>(
        { question: null, loading: true, error: null }
    );

    // fetchData fonksiyonu, soruları API'den almak için kullanılır
    const fetchData = async () => {
        try {
            const url = "https://jsonplaceholder.typicode.com/posts"; // API URL'si
            const request = await fetch(url); // API'ye istek gönderilir
            const data: QuestionData[] = await request.json(); // Gelen veriler JSON olarak alınır

            // Gelen veriler işlenerek her soru için seçenekler ayrıştırılır
            const updateQuestion = data?.slice(0, 10).map(q => ({
                ...q,
                options: splitTextIntoOptions(q.body) // Soru gövdesini seçeneklere böl
            }));
            setQuestions({ question: updateQuestion, loading: false, error: null }); // State'i güncelle
        }
        catch (Err: any) {
            // Hata durumunda error state'i güncellenir
            setQuestions({ question: null, loading: false, error: Err });
        }
    };

    // useEffect ile bileşen yüklendiğinde fetchData fonksiyonu çalıştırılır
    useEffect(() => {
        fetchData();
    }, []);

    // Soruları döndürür
    return questions;
}

export default useQuestion;