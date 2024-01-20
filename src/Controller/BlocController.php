<?php

namespace App\Controller;

use App\Entity\Bloc;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
final class BlocController extends AbstractController
{
    public function __invoke(Request $request): Bloc
    {
        $Titre=$request->get('Titre');
        $Texte=$request->get('Texte');
        $position_bloc=$request->get('position_bloc');
        $id_article=$request->get('id_article');
        $Urlimg=$request->get('Urlimg');
        $Urlcsv=$request->get('Urlcsv');

        $mediaObject = new Bloc();
        $mediaObject->setTitre($Titre);
        $mediaObject->setTexte($Texte);
        $mediaObject->setIdarticle($id_article);
        $mediaObject->setPosition($position_bloc);
        $mediaObject->setUrlimg($Urlimg);
        $mediaObject->setUrlcsv($Urlcsv);
    
        return $mediaObject;    
    }
}
