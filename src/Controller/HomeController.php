<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Article;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function home(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/ArticleGraph', name: 'app_articlegraph')]
    public function ArticleGraph(): Response
    {
        return $this->render('home/ArticleGraph.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/api/articles', name: 'app_apiarticles', methods: ['POST'])]
    public function createArticle(Request $request, EntityManagerInterface $entityManager): Response
    {

        $article = new Article();
        $article->setTitre($request->request->get('title'));
        $article->setRésumé($request->request->get('summary'));

        $entityManager->persist($article);
        $entityManager->flush();

        return new Response('Article saved with id '.$article->getId());
    }
}
