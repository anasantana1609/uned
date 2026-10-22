import {
  FolderOpen,
  ShieldCheck,
  FileCheck2,
  Search,
  LockKeyhole,
} from "lucide-react";
import { PageHeading } from "@/components/ui";
import { CivilSyllabus } from "@/components/civil-syllabus";
import { ProceduralSyllabus } from "@/components/procedural-syllabus";
export default function Sources() {
  return (
    <>
      <PageHeading
        eyebrow="EL CONOCIMIENTO EMPIEZA EN TUS FUENTES"
        title="Tu biblioteca, en un solo lugar."
        description="El espacio para tus manuales, guías y apuntes de confianza."
      />
      <div className="card civil-source-card">
        <CivilSyllabus compact />
        <ProceduralSyllabus compact />
        <section
          className="civil-syllabus"
          aria-label="Preparación de Fundamentos"
        >
          <h3>Fundamentos clásicos de la democracia y la administración</h3>
          <p>
            Tres bloques iniciales de cinco minutos, con preguntas fáciles,
            medias y difíciles. Elaborados a partir de las diapositivas de los
            temas 1 y 2, respetando las exclusiones de la introducción del curso
            2026/27.
          </p>
          <p className="muted">
            15 archivos descargados, incluido un recopilatorio de test repetido.
            Los dos archivos del libro siguen pendientes por tamaño. Las
            preguntas originales aportadas aún requieren revisión; los
            ejercicios disponibles son de elaboración propia.
          </p>
        </section>
      </div>
      <section className="card sources-intro">
        <span className="large-icon">
          <FolderOpen size={43} />
        </span>
        <span className="pill">PRÓXIMA ENTREGA</span>
        <h2>Tus documentos serán el punto de partida.</h2>
        <p>
          La conexión con Google Drive todavía no está disponible. Los
          materiales de Civil I.1, Procesal y Fundamentos se han recibido como
          archivos adjuntos para su preparación. No tenemos acceso a tu carpeta
          de Drive.
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
          Civil I.1, Procesal y Fundamentos ya tienen bloques iniciales con
          preguntas y fuentes en Asignaturas. El tutor IA y la importación
          automática siguen pendientes.
        </span>
      </div>
    </>
  );
}
