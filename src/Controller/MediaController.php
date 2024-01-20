<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\Media;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class MediaController extends AbstractController
{
    public function __invoke(Request $request): Media
    {
        $uploadedFile = $request->files->get('file');
        $nom_ressource = $request->get('nom_ressource');
        $user = $request->get('user');

        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new Media();
        $mediaObject->file = $uploadedFile;
        $mediaObject->setNom_ressource($nom_ressource);
        $mediaObject->setUser($user);

        return $mediaObject;
    }
}