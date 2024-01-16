<?php

// src/Controller/ThemeController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Response;

class ThemeController extends AbstractController
{
    #[Route('/toggle-theme', name: 'app_toggle_theme')]
    public function toggleTheme(SessionInterface $session)
    {
        $currentTheme = $session->get('theme', 'light');
        $newTheme = ($currentTheme === 'light') ? 'dark' : 'light';

        $session->set('theme', $newTheme);

        return new JsonResponse(['theme' => $newTheme]);
    }

    #[Route('/theme', name: 'app_theme')]
    public function getTheme(SessionInterface $session)
    {
        $currentTheme = $session->get('theme', 'light');

        return new JsonResponse(['theme' => $currentTheme]);
    }

    #[Route('/list-theme', name: 'app_list_themes')]
    public function listThemes(): Response
    {
        return $this->render('theme/list_themes.html.twig');
    }

    #[Route('/set-theme/{theme}', name: 'set_theme', methods: ['POST'])]
    public function setTheme(string $theme, SessionInterface $session)
    {
        $session->set('theme', $theme);

        return new JsonResponse(['success' => true]);
    }

    #[Route('/save-theme', name: 'save_theme', methods: ['POST'])]
    public function saveTheme(Request $request, SessionInterface $session)
    {
        $formData = $request->request->all();

        // Enregistrez les options de personnalisation dans la session ou dans la base de données

        return new JsonResponse(['success' => true]);
    }

}