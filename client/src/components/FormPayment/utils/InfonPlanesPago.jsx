export default function InfoPlanesPago({ plan }) {
    console.log(plan)

    switch (plan) {
        case "básico":
            return (
                <>
                    <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>


                        <p>✔️ ¡30 días de prueba gratis!</p>
                        <p>✔️ 365 días de publicación</p>
                        <p>✔️ Envío de hasta 25 familias interesadas por mes</p>
                        <p>✔️ 15 fotos del centro educativo en la plataforma</p>
                        <p>✔️ Soporte operativo disponible</p>
                    </div>

                </>
            );

        case "estandar":
            return (
                <>
                    <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>

                        <p>✔️ ¡30 días de prueba gratis!</p>
                        <p>✔️ 365 días de publicación</p>
                        <p>✔️ Envío de hasta 50 familias interesadas por mes</p>
                        <p>✔️ 30 fotos del centro educativo en la plataforma</p>
                        <p>✔️ Soporte operativo disponible</p>
                    </div>

                </>
            );
        case "exclusivo":
            return (
                <>
                    <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>

                        <p>✔️ ¡30 días de prueba gratis!</p>
                        <p>✔️ 365 días de publicación</p>
                        <p>✔️ Envío ilimitado de familias interesadas por mes</p>
                        <p>✔️ 50 fotos del centro educativo en la plataforma</p>
                        <p>✔️ Soporte operativo disponible</p>
                    </div>

                </>
            );

        default:
            return (
                <>
                    <div style={{ paddingBottom: '0vh', fontSize: '1.8vh' }}>
                        <p>✔️ ¡30 días de prueba gratis!</p>
                        <p>✔️ 365 días de publicación</p>
                        <p>✔️ Envío de hasta 2 familias interesadas por mes</p>
                        <p>✔️ 3 fotos del centro educativo en la plataforma</p>
                        <p>✔️ Soporte operativo disponible</p>

                    </div>

                </>
            );
    }
}