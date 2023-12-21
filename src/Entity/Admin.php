<?php

// src/Entity/Admin.php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[ORM\Entity(repositoryClass: AdminRepository::class)]
class Admin extends User implements PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column
     */
    // protected ?int $id = null;

    // #[ORM\Column(length: 180, unique: true, nullable: true)]
    // private ?string $nom = null;


    /**
     * @ORM\Column(type="json")
     */
    protected array $roles = [];

    /**
     * @ORM\Column(length: 255)
     */
    // private ?string $password = null;

    // public function getNom(): ?string
    // {
    //     return $this->nom;
    // }

    // public function setNom(string $nom): static
    // {
    //     $this->nom = $nom;

    //     return $this;
    // }

    // public function getPrenom(): ?string
    // {
    //     return $this->prenom;
    // }

    // public function setPrenom(string $prenom): static
    // {
    //     $this->prenom = $prenom;

    //     return $this;
    // }

    public function getRoles(): array
    {
        // Assurez-vous que ROLE_ADMIN est toujours présent dans les rôles
        $roles = $this->roles;
        $roles[] = 'ROLE_ADMIN';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        // Assurez-vous que ROLE_ADMIN est toujours présent dans les rôles
        $this->roles = $roles;

        return $this;
    }


    // public function getRoles(): array
    // {
    //     $roles = $this->roles;
    //     // guarantee every user at least has ROLE_USER
    //     $roles[] = 'ROLE_USER';

    //     return array_unique($roles);
    // }

    // public function setRoles(array $roles): static
    // {
    //     $this->roles = $roles;

    //     return $this;
    // }


    // /**
    //  * @see PasswordAuthenticatedUserInterface
    //  */
    // public function getPassword(): string
    // {
    //     return $this->password ?? '';
    // }

    // public function setPassword(string $password): static
    // {
    //     $this->password = $password;

    //     return $this;
    // }

    // Les autres méthodes et propriétés de la classe...
}
