<?php

namespace App\Controller;

use App\Entity\Bloc;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlocController extends AbstractController
{
    public function create(Request $request): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $bloc = new Bloc();
        $bloc->setTitre($request->request->get('Titre'));
        $bloc->setTexte($request->request->get('Texte'));
        $bloc->setid_article($request->request->get('position_bloc'));
        $bloc->setposition_bloc($request->request->get('id_article'));

        $entityManager->persist($bloc);
        $entityManager->flush();

        return $this->json(['message' => 'Cloc créé avec succès'], 201);
    }
}
