// ArticleForm.js
import React, { useRef, useEffect, useState } from 'react';
import ArticleBlock from './Bloc_article';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MovingText = () => {
    const textRef = useRef();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        setMousePosition({ x: clientX, y: clientY });
    };

    useFrame(() => {
        if (textRef.current) {
            const scaleFactor = 0.01; // Adjust this value based on the desired movement sensitivity
            const { x, y } = mousePosition;
            textRef.current.position.x = (x / window.innerWidth - 0.5) * scaleFactor;
            textRef.current.position.y = -(y / window.innerHeight - 0.5) * scaleFactor;
        }
    });

    return (
        <Canvas
            onPointerMove={handleMouseMove}
            style={{ width: '100%', height: '100vh', backgroundColor: 'lightgray' }}
        >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Text
                ref={textRef}
                color="black"
                fontSize={3}
                position={[0, 0, 0]}
                children="StareIt"
            />
        </Canvas>
    );
};


const ArticleForm = () => {
    const email = "test";
    let articleId = ""; // Change const to let for articleId

    const [article, setArticle] = useState({
        Titre: '',
        Resume: '',
        blocks: [],
    });

    const addBlock = () => {
        setArticle((prevArticle) => ({
            ...prevArticle,
            blocks: [...prevArticle.blocks, { Titre: '', Texte: '' }],
        }));
    };

    const updateBlock = (index, updatedBlock) => {
        setArticle((prevArticle) => {
            const updatedBlocks = [...prevArticle.blocks];
            updatedBlocks[index] = updatedBlock;
            return { ...prevArticle, blocks: updatedBlocks };
        });
    };

    const removeBlock = (index) => {
        setArticle((prevArticle) => {
            const updatedBlocks = [...prevArticle.blocks];
            updatedBlocks.splice(index, 1);
            return { ...prevArticle, blocks: updatedBlocks };
        });
    };

    const submitBlocksToServer = async (article) => {
        try {
            const blocData = article.blocks.map((block, index) => ({ // Added index parameter
                Titre: block.Titre,
                Texte: block.Texte,
                Idarticle: articleId,
                Position: "" + index,
            }));

            await Promise.all(
                blocData.map(async (blocData) => {
                    try {
                        const jsonData_bloc = JSON.stringify(blocData);
                        console.log(jsonData_bloc);
                        const response_bloc = await fetch('http://localhost:8000/api/blocs', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/ld+json',
                                'Content-Type': 'application/ld+json'
                            },
                            body: jsonData_bloc,
                        });
                        console.log('Réponse du serveur:', jsonData_bloc);

                        const responseData2 = await response_bloc.json();
                        console.log('Réponse du serveur:', responseData2);
                    } catch (error) {
                        console.error('Erreur lors de l\'envoi d\'un bloc:', error);
                    }
                })
            );
        } catch (error) {
            console.error('Erreur lors de l\'envoi des blocs:', error);
        }
    };

    const handleArticleSubmit = async () => {
        try {
            const articleData = {
                Titre: article.Titre,
                Resume: article.Resume,
                Createur: "test",
            };
            const jsonData_article = JSON.stringify(articleData);

            const response_article = await fetch('http://localhost:8000/api/articles', {
                method: 'POST',
                headers: {
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/ld+json'
                },
                body: jsonData_article,
            });

            console.log(jsonData_article);

            const responseData = await response_article.json();

            console.log('Réponse du serveur:', responseData);
            const idArray = responseData['@id'].split('/api/articles/');
            articleId = idArray[1];

            console.log(articleId);
            await submitBlocksToServer(article);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'article:', error);
        }
    };

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar />

                <main className="flex-1 bg-gray-100 p-6">
                <Navbar />

                    <div className="gap-8 mt-6">
                        <div className="container mx-auto mt-8">
                            <h1 className="text-2xl font-bold mb-4">Création d'article</h1>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="Titre" className="block text-sm font-medium text-gray-600">
                                        Titre de l'article
                                    </label>
                                    <input
                                        type="text"
                                        id="Titre"
                                        name="Titre"
                                        value={article.Titre}
                                        onChange={(e) => setArticle({ ...article, Titre: e.target.value })}
                                        className="mt-1 p-2 border rounded-md w-full"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="Resume" className="block text-sm font-medium text-gray-600">
                                        Résumé de l'article
                                    </label>
                                    <textarea
                                        id="Resume"
                                        name="Resume"
                                        value={article.Resume}
                                        onChange={(e) => setArticle({ ...article, Resume: e.target.value })}
                                        className="mt-1 p-2 border rounded-md w-full"
                                        required
                                    ></textarea>
                                </div>

                                {article.blocks.map((block, index) => (
                                    <ArticleBlock
                                        key={index}
                                        index={index}
                                        block={block}
                                        updateBlock={updateBlock}
                                        removeBlock={removeBlock}
                                    />
                                ))}

                                <button
                                    type="button"
                                    onClick={addBlock}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Ajouter un bloc
                                </button>

                                <button
                                    type="button"
                                    onClick={handleArticleSubmit}
                                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                                >
                                    Créer l'article
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ArticleForm;
