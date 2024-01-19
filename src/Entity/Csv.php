<?php
// api/src/Entity/MediaObject.php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\CsvController;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['csv_object:read']], 
    types: ['https://schema.org/MediaObject'],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            controller: CsvController::class, 
            deserialize: false, 
            validationContext: ['groups' => ['Default', 'csv_object_create']], 
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
class Csv
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups(['csv_object:read'])]
    public ?string $contentUrl = null;

    #[Vich\UploadableField(mapping: 'csv_object', fileNameProperty: 'filePath')]
    #[Assert\NotNull(groups: ['csv_create'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)] 
    public ?string $filePath = null;

    #[ORM\Column(nullable: true)] 
    public ?string $nom_ressource = null;

    #[ORM\Column(nullable: true)] 
    public ?string $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }
    public function getNom_ressource(): ?string
    {
        return $this->nom_ressource;
    }
    public function setNom_ressource(string $nom_ressource): static
    {
        $this->nom_ressource = $nom_ressource;

        return $this;
    }
    public function getUser(): ?string
    {
        return $this->user;
    }
    public function setUser(string $user): static
    {
        $this->user = $user;

        return $this;
    }
}