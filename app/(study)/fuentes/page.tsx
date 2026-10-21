import {
  FolderOpen,
  ShieldCheck,
  FileCheck2,
  Search,
  LockKeyhole,
} from "lucide-react";
import { PageHeading } from "@/components/ui";
export default function Sources() {
  return (
    <>
      <PageHeading
        eyebrow="EL CONOCIMIENTO EMPIEZA EN TUS FUENTES"
        title="Tu biblioteca, en un solo lugar."
        description="El espacio para tus manuales, guías y apuntes de confianza."
      />
      <section className="card sources-intro">
        <span className="large-icon">
          <FolderOpen size={43} />
        </span>
        <span className="pill">PRÓXIMA ENTREGA</span>
        <h2>Tus documentos serán el punto de partida.</h2>
        <p>
          La conexión con Google Drive todavía no está disponible. No tenemos
          acceso a tu carpeta ni hemos leído documentos personales.
        </p>
        <div className="source-folder">
          <FolderOpen size={19} />
          <div>
            <strong>11 UNED</strong>
            <small>Carpeta prevista · Sin conectar</small>
          </div>
          <LockKeyhole size={17} />
        </div>
        <div className="sources-steps">
          <div>
            <ShieldCheck size={23} />
            <h3>Tú decides qué se usa</h3>
            <p>
              Los documentos nuevos necesitarán tu aprobación antes de
              incorporarse al tutor.
            </p>
          </div>
          <div>
            <FileCheck2 size={23} />
            <h3>Cada explicación, con su fuente</h3>
            <p>
              Se citarán el archivo y la página cuando conste. Nunca se
              inventarán referencias.
            </p>
          </div>
          <div>
            <Search size={23} />
            <h3>Solo tu espacio de estudio</h3>
            <p>
              El acceso quedará limitado a la carpeta autorizada y sus
              subcarpetas.
            </p>
          </div>
        </div>
      </section>
      <div className="inline-note">
        <ShieldCheck size={19} />
        <span>
          El tutor IA, los resúmenes y las preguntas con fuentes se habilitarán
          después de la conexión y aprobación de documentos.
        </span>
      </div>
    </>
  );
}
