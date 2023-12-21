<?php

// src/Entity/Admin.php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;


#[ORM\Entity(repositoryClass: AdminRepository::class)]
class Admin extends User
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column
     */
    protected ?int $id = null;

    /**
     * @ORM\Column(length: 180)
     */
    private ?string $nom = null;

    /**
     * @ORM\Column(length: 180)
     */
    private ?string $prenom = null;

    /**
     * @ORM\Column(type="json")
     */
    protected array $roles = [];

    /**
     * @ORM\Column(length: 255)
     */
    private ?string $password = null;

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

    public function getRoles(): array
    {
        // Assurez-vous que ROLE_ADMIN est toujours présent dans les rôles
        $roles = parent::getRoles();
        $roles[] = 'ROLE_ADMIN';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        // Assurez-vous que ROLE_ADMIN est toujours présent dans les rôles
        $roles[] = 'ROLE_ADMIN';
        parent::setRoles($roles);

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password ?? '';
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }
}
