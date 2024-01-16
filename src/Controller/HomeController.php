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
    #[Route('/article_creation', name: 'app_article_creation')]
    public function Article_creation(): Response
    {
        return $this->render('home/article_creation.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/ajout_media', name: 'app_home')]
    public function ajoutmedia(): Response
    {
        return $this->render('home/Ajout_media.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/view_media', name: 'app_media')]
    public function Media(): Response
    {
        return $this->render('home/Media.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/acceuil', name: 'app_acceuil')]
    public function Acceuil(): Response
    {
        return $this->render('home/acceuil.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
