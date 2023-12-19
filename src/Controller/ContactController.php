<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ContactMessage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Form\ContactMessageType;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function contact(Request $request, EntityManagerInterface $entityManager): Response
        {
            $contactMessage = new ContactMessage();
            $form = $this->createForm(ContactMessageType::class, $contactMessage);
            $form->handleRequest($request);
    
            if ($form->isSubmitted() && $form->isValid()) {
                // Enregistrez le message dans la base de données
                $entityManager->persist($contactMessage);
                $entityManager->flush();
    
                // Ajoutez un message Flash pour confirmer l'envoi du message
                $this->addFlash('success', 'Votre message a été envoyé avec succès.');
    
                // Redirigez l'utilisateur ou faites ce que vous voulez
                return $this->redirectToRoute('app_home');
            }
    
            return $this->render('contact/index.html.twig', [
                'form' => $form->createView(),
            ]);
        }
    }
    //     return $this->render('home/contactus.html.twig', [
    //         'controller_name' => 'ContactController',
    //     ]);
    // }

