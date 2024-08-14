import React, { useContext } from 'react';
import { Progress } from '@nextui-org/react';
import { StateContext } from '../Provider/context';

// ProgressBar bileşeni, kalan zamanı gösteren bir ilerleme çubuğu render eder
const ProgressBar: React.FC = () => {
    // StateContext'ten gerekli değerleri almak için useContext kullanılıyor
    const context = useContext(StateContext);

    // Eğer context mevcut değilse, bir hata fırlatılır
    if (!context) {
        throw new Error("ProgressBar must be used within a StateProvider");
    }

    const { timeLeft } = context;

    // İlerleme yüzdesini hesaplar (toplam süre 30 saniye üzerinden)
    const progress = (timeLeft / 30) * 100;

    // İlerleme çubuğunun rengini kalan süreye göre belirler
    const barColor = () => {
        if (timeLeft > 20) {
            return "success"; // Kalan süre 20 saniyeden fazlaysa yeşil (başarılı) renk gösterilir
        }
        if (timeLeft > 10 && timeLeft <= 20) {
            return "warning"; // Kalan süre 10-20 saniye arasındaysa sarı (uyarı) renk gösterilir
        }
        return "danger"; // Kalan süre 10 saniyeden azsa kırmızı (tehlike) renk gösterilir
    };

    return (
        <div className="w-11/12 mx-auto">
            {/* Kalan süreyi metin olarak gösterir */}
            <p className='font-bold'>{timeLeft}</p>
            {/* İlerleme çubuğunu render eder */}
            <Progress
                aria-label='progress'
                value={progress}
                color={barColor()}
                size='sm'
            />
        </div>
    );
};

export default ProgressBar;
