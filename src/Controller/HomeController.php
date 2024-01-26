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
    #[Route('/test', name: 'app_stat')]
    public function stat(): Response
    {
        return $this->render('home/stat.html.twig', [
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
    #[Route('/Accueil', name: 'Accueil')]
    public function Acceuil(): Response
    {
        return $this->render('home/Accueil.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/', name: 'Welcome')]
    public function Welcome(): Response
    {
        return $this->render('home/Accueil.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
   #[Route('/articles/{id}', name: 'app_articleid')]
    public function article($id): Response
    {
        return $this->render('home/article.html.twig', [
            'controller_name' => 'HomeController',
            'article_id' => $id,
        ]);
    }

    #[Route('/lesarticles', name: 'app_lesarticles')]
    public function lesarticles(): Response
    {
        return $this->render('home/les_articles.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
    #[Route('/themes', name: 'app_lesthemes')]
    public function themes(): Response
    {
        return $this->render('home/themes.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
