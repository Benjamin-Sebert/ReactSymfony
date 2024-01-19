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
    #[Route('/Creation_article', name: 'app_creation_article')]
    public function creationarticle(): Response
    {
        return $this->render('home/Creation_article.html.twig', [
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
    #[Route('/ajout_csv', name: 'app_csv')]
    public function ajoutcsv(): Response
    {
        return $this->render('home/Ajout_csv.html.twig', [
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
    #[Route('/lesarticles', name: 'app_lesarticles')]
    public function lesarticles(): Response
    {
        return $this->render('home/les_articles.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
