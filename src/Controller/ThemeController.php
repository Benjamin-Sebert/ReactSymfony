<?php

// src/Controller/ThemeController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ThemeController extends AbstractController
{
    #[Route('/theme', name: 'app_theme')]
    public function toggleTheme(SessionInterface $session)
    {
        $currentTheme = $session->get('theme', 'light');
        $newTheme = ($currentTheme === 'light') ? 'dark' : 'light';

        $session->set('theme', $newTheme);

        return new JsonResponse(['theme' => $newTheme]);
    }
}