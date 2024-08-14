import React, { useContext } from 'react'
import { StateContext } from '../Provider/context'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";

// MyAnswers bileşeni, kullanıcının sınavdaki cevaplarını özetleyen bir tabloyu görüntüler
const MyAnswers = () => {
    // StateContext'i kullanarak context'i alıyoruz
    const context = useContext(StateContext);

    // Eğer context mevcut değilse, bir hata fırlatılır
    if (!context) {
        throw new Error("MyAnswers must be used within a StateProvider");
    }

    // Context'ten myAnswers değerini alıyoruz
    const { myAnswers } = context;

    return (
        // Sayfa yapısını oluşturan div, flexbox ile hizalama yapar
        <div className='flex flex-col w-full xs:h-full  items-center justify-center xs:justify-start gap-y-10 xs:gap-y-4  text-black '>
            {/* Sınav özetini gösteren başlık */}
            <p className='text-white text-4xl xs:h-1/12 font-bold '>Exam summary</p>

            {/* Cevapları gösteren tablo */}
            <Table isStriped aria-label="Example static collection table"
                className='w-3/4 xs:w-full  xs:h-5/6  '>

                {/* Tablo başlıklarını belirler */}
                <TableHeader>
                    <TableColumn>Question Number</TableColumn>
                    <TableColumn>Question</TableColumn>
                    <TableColumn>Your Answer</TableColumn>
                </TableHeader>

                {/* Tablo gövdesi, her bir cevabı bir satırda gösterir */}
                <TableBody>
                    {myAnswers.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>Question {item.id}</TableCell>
                            <TableCell>{item.question}</TableCell>
                            <TableCell>{item.answer}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Tekrar dene butonu, sayfayı yenileyerek sınavı yeniden başlatır */}
            <Button onPress={() => window.location.reload()} className='text-white font-bold  ' size="lg" color='success'>Again Try</Button>
        </div>
    )
}

export default MyAnswers;