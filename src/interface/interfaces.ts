// QuestionData arayüzü, bir sorunun yapısını tanımlar
export interface QuestionData {
    id: number; // Sorunun benzersiz kimliği
    title: string; // Sorunun başlığı
    body: string; // Sorunun açıklaması veya gövdesi
    userId: number; // Soruyu oluşturan kullanıcının kimliği
    options?: string[]; // Sorunun seçenekleri (isteğe bağlı)
}

// QuestionState arayüzü, soru durumu yönetimi için kullanılır
export interface QuestionState {
    question: QuestionData[] | null; // Soruların listesi veya null (sorular yüklenmemişse)
    loading: boolean; // Soruların yüklenip yüklenmediğini belirten bayrak
    error: string | null; // Bir hata meydana geldiğinde hata mesajını tutar (aksi halde null)
}

// MyAnswerState arayüzü, kullanıcının verdiği cevapları tanımlar
export interface MyAnswerState {
    id: number; // Cevabın ait olduğu sorunun kimliği
    question: string; // Sorunun metni
    answer: string; // Kullanıcının verdiği cevap
}