export default function infoPlanes({plan}) {
console.log(plan)

  switch (plan) {
    case "básico":
      return (
        <>
          <p>✔️ ¡30 días de prueba gratis!</p>
          <p>✔️ 365 días de publicación</p>
          <p>✔️ Envío de hasta 25 familias interesadas por mes</p>
          <p>✔️ 15 fotos del centro educativo en la plataforma</p>
          <p>✔️ Soporte operativo disponible</p>
        </>
      );

    case "estandar":
      return (
        <>
          <p>✔️ ¡30 días de prueba gratis!</p>
          <p>✔️ 365 días de publicación</p>
          <p>✔️ Envío de hasta 50 familias interesadas por mes</p>
          <p>✔️ 30 fotos del centro educativo en la plataforma</p>
          <p>✔️ Soporte operativo disponible</p>
        </>
      );
    case "exclusivo":
      return (
        <>
          <p>✔️ ¡30 días de prueba gratis!</p>
          <p>✔️ 365 días de publicación</p>
          <p>✔️ Envío ilimitado de familias interesadas por mes</p>
          <p>✔️ 50 fotos del centro educativo en la plataforma</p>
          <p>✔️ Soporte operativo disponible</p>
        </>
      );

    default:
      return (
        <>
          <p>✔️ ¡30 días de prueba gratis!</p>
          <p>✔️ 365 días de publicación</p>
          <p>✔️ Envío de hasta 2 familias interesadas por mes</p>
          <p>✔️ 3 fotos del centro educativo en la plataforma</p>
          <p>✔️ Soporte operativo disponible</p>
        </>
      );
  }
}