<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ContactMessage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Form\ContactMessageType;
use App\Controller\User;

use Symfony\Component\HttpFoundation\JsonResponse;


use Symfony\Component\Security\Core\Security;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact_1', methods: ['GET'])]
    public function contact()
    {
        return $this->render('contact/index.html.twig');
    }

    #[Route('/contact', name: 'app_contact', methods: ['POST'])]
    public function contact_post(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $contactMessage = new ContactMessage();
        $contactMessage->setNom($data['nom'] ?? '');
        $contactMessage->setPrenom($data['prenom'] ?? '');
        $contactMessage->setEmail($data['email'] ?? '');
        $contactMessage->setMessage($data['message'] ?? '');

        $entityManager->persist($contactMessage);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Form submitted successfully!'], JsonResponse::HTTP_OK);
    }

    #[Route('/contact/merci', name: 'app_merci')]
    public function thankYou(): Response
    {
        return $this->render('contact/thank_you.html.twig');
    }
}