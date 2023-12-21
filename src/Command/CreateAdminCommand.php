<?php
// src/Command/CreateAdminCommand.php

namespace App\Command;

use App\Entity\Admin;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CreateAdminCommand extends Command
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordEncoder;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordEncoder)
    {
        parent::__construct();

        $this->entityManager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;
    }

    protected function configure(): void
    {
        $this
            ->setName('app:create-admin')
            ->setDescription('Create a new admin user');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // Créer un nouvel utilisateur administrateur
        $admin = new Admin();
        $admin->setEmail('admin@example.com');
        $admin->setNom('Admin');
        $admin->setPrenom('Admin');
        $admin->setRoles(['ROLE_ADMIN']);

        // Générer le mot de passe (changez "password" par le mot de passe souhaité)
        $encodedPassword = $this->passwordEncoder->hashPassword($admin, 'pass_1234');
        $admin->setPassword($encodedPassword);

        // Enregistrer l'administrateur dans la base de données
        $this->entityManager->persist($admin);
        $this->entityManager->flush();

        $output->writeln('Admin user created successfully.');

        return Command::SUCCESS;
    }
}