<?php

namespace App\Entity;

use App\Repository\ContactMessageRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;



#[ORM\Entity(repositoryClass: ContactMessageRepository::class)]
class ContactMessage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

     /**
     * @Assert\NotBlank(message="Le champ Nom ne peut pas être vide.")
     */

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    /**
     * @Assert\NotBlank(message="Le champ Prénom ne peut pas être vide.")
     */
    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    /**
     * @Assert\NotBlank(message="Le champ Email ne peut pas être vide.")
     * @Assert\Email(message="L'adresse email '{{ value }}' n'est pas valide.")
     */
    #[ORM\Column(length: 255)]
    private ?string $email = null;

     /**
     * @Assert\NotBlank(message="Le champ Message ne peut pas être vide.")
     */
    #[ORM\Column(type: Types::TEXT)]
    private ?string $message = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    // private ?User $relation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    // public function getRelation(): ?User
    // {
    //     return $this->relation;
    // }

    // public function setRelation(?User $relation): static
    // {
    //     $this->relation = $relation;

    //     return $this;
    // }
}
