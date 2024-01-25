<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\BlocController;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['bloc_object:read']],
    types: ['https://schema.org/MediaObject'],
    operations: [
        new Get(normalizationContext: ['groups' => 'Bloc:item']),
        new GetCollection(normalizationContext: ['groups' => 'Bloc:list']),
        new GetCollection(),
        new Post(
        controller: BlocController::class,
        deserialize: false,
        validationContext: ['groups' => ['Default', 'bloc_object_create']],
        openapi: new Model\Operation(
            requestBody: new Model\RequestBody(
                content: new \ArrayObject([
                    'multipart/form-data' => [
                        'schema' => [
                            'type' => 'object',
                            'properties' => [
                                'file' => [
                                    'type' => 'string',
                                    'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ])
                )
            )
        )
    ]
)]
class Bloc
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    #[Groups(['bloc_object:read'])]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bloc_object:read'])]
    private ?string $Titre = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bloc_object:read'])]
    private ?string $Texte = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bloc_object:read'])]
    private ?string $Position = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bloc_object:read'])]
    private ?string $Urlimg = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bloc_object:read'])]
    private ?string $Urlcsv = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bloc_object:read'])]
    private ?string $ColonneCsv = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['bloc_object:read'])]
    private ?string $Idarticle = null;

    public function getColonneCsv(): string
    {
        return $this->ColonneCsv;
    }
    public function setColonneCsv(string $ColonneCsv): static
    {
        $this->ColonneCsv = $ColonneCsv;

        return $this;
    }
    public function getUrlimg(): string
    {
        return $this->Urlimg;
    }
    public function setUrlimg(string $Urlimg): static
    {
        $this->Urlimg = $Urlimg;

        return $this;
    }
    public function getUrlcsv(): string
    {
        return $this->Urlcsv;
    }
    public function setUrlcsv(string $Urlcsv): static
    {
        $this->Urlcsv = $Urlcsv;

        return $this;
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->Titre;
    }

    public function setTitre(string $Titre): static
    {
        $this->Titre = $Titre;

        return $this;
    }

    public function getTexte(): string
    {
        return $this->Texte;
    }

    public function setTexte(?string $Texte): static
    {
        $this->Texte = $Texte;

        return $this;
    }
    public function getIdarticle(): string
    {
        return $this->Idarticle;
    }

    public function setIdarticle(string $Idarticle): static
    {
        $this->Idarticle = $Idarticle;

        return $this;
    }
    public function getPosition(): string
    {
        return $this->Position;
    }

    public function setPosition(?string $Position): static
    {
        $this->Position = $Position;

        return $this;
    }
}
