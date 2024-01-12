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
    #[Route('/ArticleGraph', name: 'app_articlegraph')]
    public function ArticleGraph(): Response
    {
        return $this->render('home/ArticleGraph.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/Media', name: 'app_media')]
    public function Media(): Response
    {
        return $this->render('home/Media.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
