import { NextRequest, NextResponse } from 'next/server';

import { url } from 'inspector';

export async function POST(request: NextRequest) {
  try {
    const { documentId } = await request.json();
    const response = await fetch(`http://localhost:5101/Document/GetById?fileId=${documentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      cache: 'no-store'
    });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message );
    // }
    
    //const data = await response.json();

    const data = {
      "id": "1",
      "title": "Description Midstream Project",
      "date": "2021-09-01T00:00:00",
      "sections": [
        {
          "type": "paragraph",
          "title": "Introduction",
          "content": "Le projet Midstream est un projet collaboratif et évolutif qui s'adapte à vos besoins. Il permet aux équipes de travailler ensemble de manière efficace, en utilisant des outils de gestion de projet modernes et des méthodologies agiles."
        },
        {
          "type": "section",
          "title": "Fonctionnalités",
          "content": [
            {
              "type": "section",
              "title": "I. Initialisation",
              "content": [
                {
                  "type": "paragraph",
                  "title": "1. Création de projets",
                  "content": "Midstream permet de créer de nouveaux projets collaboratifs. Grâce à une interface intuitive, les utilisateurs peuvent rapidement initier des projets, définir des objectifs, et inviter des membres de l'équipe. Cela permet ainsi de travailler en équipe de manière structurée et organisée."
                },
                {
                  "type": "paragraph",
                  "title": "2. Création de tâches",
                  "content": "Les utilisateurs peuvent créer des tâches spécifiques au sein de chaque projet. Chaque tâche peut être assignée à un membre de l'équipe, avec des dates d'échéance et des priorités définies. Cela assure une répartition claire du travail et une gestion efficace du temps."
                },
                {
                  "type": "paragraph",
                  "title": "3. Upload de fichiers",
                  "content": "Midstream permet l'upload de fichiers directement sur la plateforme. Les membres de l'équipe peuvent ainsi partager des documents, des images, et d'autres ressources nécessaires à l'avancement du projet. Tous les fichiers sont stockés de manière sécurisée et peuvent être facilement consultés par les membres autorisés."
                }
              ]
            },
            {
              "type": "referenced",
              "reference": {
                "document": "Midstream Project Plan",
                "section": "1",
                "documentId": "2",
              },
              "title": "II. Suivi de projet",
              "content": [
                {
                  "type": "paragraph",
                  "title": "1. Références",
                  "content": "Le 'Midstream Project Plan' sert de référence pour le suivi de projet. Il inclut des détails sur les objectifs, les étapes importantes, et les métriques de performance. Les chefs de projet peuvent se référer à ce document pour assurer que le projet reste sur la bonne voie."
                },
                {
                  "type": "paragraph",
                  "title": "2. Suivi de l'avancement des tâches",
                  "content": "Midstream fournit des outils pour suivre l'avancement des tâches en temps réel. Les tableaux de bord interactifs et les rapports automatisés permettent aux équipes de voir quelles tâches sont en cours, terminées, ou en retard. Cela facilite la prise de décision et l'ajustement des plans en fonction des besoins."
                },
                {
                  "type": "paragraph",
                  "title": "3. Gestion des ressources",
                  "content": "Le suivi de projet inclut également la gestion des ressources. Midstream permet de surveiller l'utilisation des ressources telles que le temps, le budget, et les équipements. Les alertes et notifications aident à identifier les problèmes potentiels avant qu'ils ne deviennent critiques."
                }
              ]
            },
            {
              "type": "reference",
              "reference": {
                "document": "Midstream Project Plan",
                "section": "1",
                "documentId": "2",
              },
              "title": "III. Collaboration et communication",
              "content": [
                {
                  "type": "paragraph",
                  "title": "1. Messagerie intégrée",
                  "content": "Midstream intègre une fonction de messagerie qui permet aux membres de l'équipe de communiquer rapidement et facilement. Les discussions peuvent être organisées par projet ou par tâche, assurant que toutes les communications pertinentes sont facilement accessibles."
                },
                {
                  "type": "paragraph",
                  "title": "2. Réunions virtuelles",
                  "content": "La plateforme prend en charge l'organisation de réunions virtuelles, avec des outils de visioconférence intégrés. Les utilisateurs peuvent planifier des réunions, envoyer des invitations, et partager des écrans ou des documents en temps réel, facilitant ainsi la collaboration à distance."
                },
                {
                  "type": "paragraph",
                  "title": "3. Feedback et révisions",
                  "content": "Midstream permet également de recueillir du feedback et de gérer les révisions de manière structurée. Les membres de l'équipe peuvent commenter sur les tâches et les documents, suggérer des modifications, et approuver les changements. Cela assure que tous les membres sont alignés et que les livrables sont de haute qualité."
                }
              ]
            }
          ]
        }
      ]
    }
    



    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
