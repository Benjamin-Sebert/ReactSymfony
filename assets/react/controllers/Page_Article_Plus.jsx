import React from 'react';
import Article_Visualisation_Creation from './Article_Visualisation_Creation';
import AvatarButton from './Avatar';

const avcreation = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col md:flex-row h-screen">

        <aside className="w-full md:w-2/12 bg-custom-black p-4 shadow-xl md:shadow-none">
          <ul>
            <li>
              <a class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md " href="#">
                <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>

                <span class="mx-4 font-medium">Accueil</span>
              </a>
            </li>

            <li>
              <a class="flex items-center px-4 py-2 mt-5 hover:text-black rounded-md hover:bg-gray-200" href="#">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                </svg>

                <span class="mx-4 font-medium dark:text-white">Créer mon article</span>
              </a>
            </li>

            <li>
              <a class="flex items-center px-4 py-2 mt-5 hover:text-black rounded-md hover:bg-gray-200" href="#">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 7V2.13a2.98 2.98 0 0 0-1.293.749L4.879 5.707A2.98 2.98 0 0 0 4.13 7H9Z" />
                  <path d="M18.066 2H11v5a2 2 0 0 1-2 2H4v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 20 20V4a1.97 1.97 0 0 0-1.934-2ZM10 18a1 1 0 1 1-2 0v-2a1 1 0 1 1 2 0v2Zm3 0a1 1 0 0 1-2 0v-6a1 1 0 1 1 2 0v6Zm3 0a1 1 0 0 1-2 0v-4a1 1 0 1 1 2 0v4Z" />
                </svg>

                <span class="mx-4 font-medium dark:text-white">Afficher mes articles</span>
              </a>
            </li>

            <li>
              <a class="flex items-center px-4 py-2 mt-5 hover:text-black rounded-md hover:bg-gray-200" href="#">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                  <path fill="currentColor" d="M11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-4.572 3.072L3.857 15.92h7.949l-1.811-3.37-1.61 2.716-1.912-4.679Z" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 1v4a1 1 0 0 1-1 1H1m14 12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v16ZM11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM3.857 15.92l2.616-5.333 1.912 4.68 1.61-2.717 1.81 3.37H3.858Z" />
                </svg>

                <span class="mx-4 font-medium dark:text-white">Médias</span>
              </a>
            </li>

          </ul>

        </aside>

        <main className="flex-1 bg-gray-100 p-6">
          <div className="flex items-center justify-between border-b border-custom-black pb-4">
          <h1 className="font-bold text-black">Stare<span className="font-bold text-custom-red">It</span></h1>
            <div className="flex items-center space-x-4">

              <AvatarButton />

            </div>
          </div>

          <div className="gap-8 mt-6">
            <Article_Visualisation_Creation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default avcreation;
