<?php

namespace App\Controller;

use App\Entity\Article;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ArticleController extends AbstractController
{
    public function create(Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $article = new Article();
        $article->setTitre($request->request->get('Titre'));
        $article->setResume($request->request->get('Resume'));

        $entityManager->persist($article);
        $entityManager->flush();

        return $this->json(['message' => 'Article créé avec succès'], 201);
    }
}
