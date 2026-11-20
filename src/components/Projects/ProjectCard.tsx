import Image from "next/image";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
  total: number;
};

/** One sticky project card. Projects.tsx scales and dims it when covered. */
export default function ProjectCard({ project, index, total }: Props) {
  const num = String(index + 1).padStart(2, "0");
  const imgSizes = "(max-width: 768px) 90vw, 40vw";
  return (
    <li className="card" style={{ "--i": index, "--n": total } as React.CSSProperties} data-card>
      <article aria-labelledby={`project-${index}`}>
        <div className="card__head">
          <span className="card__num disp" aria-hidden="true">
            {num}
          </span>
          <div>
            <p className="card__label">PROJECT</p>
            <h3 id={`project-${index}`} className="card__name">
              {project.name}
            </h3>
          </div>
          <a
            className="card__live"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} live project (opens in a new tab)`}
          >
            LIVE PROJECT
          </a>
        </div>
        <div className="card__body card__media" data-card-media>
          <div className="card__img card__img--main zoom">
            <Image src={project.main.src} alt={project.main.alt} fill sizes="(max-width: 768px) 90vw, 60vw" />
          </div>
          <div className="card__side">
            {project.side.map((shot) => (
              <div key={shot.src} className="card__img zoom">
                <Image src={shot.src} alt={shot.alt} fill sizes={imgSizes} />
              </div>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}
