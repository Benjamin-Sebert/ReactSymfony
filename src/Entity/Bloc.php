<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Controller\BlocController;
use ApiPlatform\Metadata\ApiProperty;

use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BlocRepository::class)]
#[ApiResource]
class Bloc
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Titre = null;

    #[ORM\Column(length: 255)]
    private ?string $Texte = null;

    #[ORM\Column(length: 255)]
    private ?string $Position = null;

    #[ORM\Column(length: 255)]
    private ?string $Idarticle = null;

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

    public function getTexte(): ?string
    {
        return $this->Texte;
    }

    public function setTexte(string $Texte): static
    {
        $this->Texte = $Texte;

        return $this;
    }
    public function getIdarticle(): ?string
    {
        return $this->Idarticle;
    }

    public function setIdarticle(string $Idarticle): static
    {
        $this->Idarticle = $Idarticle;

        return $this;
    }
    public function getPosition(): ?string
    {
        return $this->Position;
    }

    public function setPosition(string $Position): static
    {
        $this->Position = $Position;

        return $this;
    }
}
