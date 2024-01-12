<?php
namespace App\Controller;

use App\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class ArticleController extends AbstractController
{
    public function __invoke(Request $request): Article
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new Article();
        $mediaObject->file = $uploadedFile;

        return $mediaObject;
    }
    #[Route('/Media', name: 'app_media')]
    public function view_media(): Response
    {
        return $this->render('home/media.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}