<?php
// src/Controller/Admin/DashboardController.php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Form\EditUserType;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Request; // Ajoutez cette ligne
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Doctrine\ORM\EntityManagerInterface;


class DashboardController extends AbstractDashboardController
{
    private $entityManager;
    private $passwordHasher;


    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $userPasswordHasher;
    }

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        if (!$this->isGranted('ROLE_ADMIN')) {
            $this->addFlash('error', 'Vous n\'avez pas la permission d\'accéder à cette page.');
            return $this->redirectToRoute('app_login');
        }

        // Utilisez le gestionnaire d'entités injecté pour récupérer les utilisateurs
        $users = $this->entityManager->getRepository(User::class)->findAll();

        return $this->render('admin/test_dashboard_custom.html.twig', [
            'users' => $users,
        ]);
    }

    #[Route('/admin/user/{id}/edit', name: 'admin_user_edit')]
    public function editUser(int $id, Request $request): Response
    {
        $user = $this->entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            throw $this->createNotFoundException('Utilisateur non trouvé');
        }

        $form = $this->createForm(EditUserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Encodez le nouveau mot de passe si le champ de mot de passe est rempli
            if ($form->get('password')->getData()) {
                $encodedPassword = $this->passwordHasher->hashPassword($user, $form->get('password')->getData());
                $user->setPassword($encodedPassword);
            }

            $this->entityManager->flush();

            // Redirigez l'utilisateur vers une page de confirmation ou ailleurs
            return $this->redirectToRoute('admin');
        }

        return $this->render('admin/edit_user.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('ReactSymfony');
    }
}
