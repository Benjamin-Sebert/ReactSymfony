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


use Symfony\Component\Security\Core\Security;

class ContactController extends AbstractController
{

    

    #[Route('/contact', name: 'app_contact')]
   
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $message = new ContactMessage();
        $form = $this->createForm(ContactMessageType::class, $message);

         

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Récupérer l'utilisateur connecté
            $user = $this->getUser();

            
            // $message->setMessage($user);

            // Enregistrer le message en base de données
            // $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($message);
            $entityManager->flush();

            // Rediriger vers la page de remerciement
            return $this->redirectToRoute('app_merci');
        }

        return $this->render('contact/index.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }

    #[Route('/contact/merci', name: 'app_merci')]
public function thankYou(): Response
{
    return $this->render('contact/thank_you.html.twig');
}
}