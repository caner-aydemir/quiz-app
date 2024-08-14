
import React, { useContext } from 'react';
import ShowAllQuestions from './components/ShowAllQuestions';
import { StateContext } from './Provider/context';
import MyAnswers from './components/MyAnswers';

const App: React.FC = () => {

  const mainStyle = "w-full xs:w-full flex p-10 xs:p-2 mx-auto h-screen bg-gray-950"; // Ana stil sınıfı
  const context = useContext(StateContext); // StateContext'ten gerekli state ve fonksiyonları almak için useContext kullanılır

  // Eğer context mevcut değilse, bir hata fırlatılır
  if (!context) {
    throw new Error("App must be used within a StateProvider");
  }

  const { currentQuestionIndex } = context; // Şu anki soru index'ini alır

  return (
    // Ana div, sayfanın içeriğini düzenlemek için kullanılır
    <div className={mainStyle}>
      {
        // Eğer currentQuestionIndex 10'a eşitse, yani tüm sorular bittiğinde, MyAnswers bileşenini gösterir
        currentQuestionIndex === 10
          ?
          <MyAnswers />
          :
          // Eğer currentQuestionIndex 10'dan küçükse, ShowAllQuestions bileşenini gösterir
          <ShowAllQuestions />
      }
    </div>
  );
};

export default App;

