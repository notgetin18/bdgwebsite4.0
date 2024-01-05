import React from 'react';

interface BottomSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    productsDetailById: any
}

const BottomSidebar: React.FC<BottomSidebarProps> = ({ isOpen, onClose, productsDetailById }) => {
    console.log('productsDetailById from bottom aside', productsDetailById)
    return (
        <div className={`coins_background rounded-2xl  fixed bottom-0 left-0 right-0 bg-white p-4 transform transition-transform ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            {/* Your sidebar content goes here */}
            <p className='text-white'>I am from bottom aside </p>
            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil recusandae harum quos dolore nesciunt optio atque nemo architecto sint debitis reiciendis aspernatur laboriosam impedit totam, consequuntur deserunt animi libero aut autem vero aliquam rem voluptatum fugit. Nostrum incidunt veniam consequatur molestias accusamus minima, rerum, repudiandae perspiciatis quam suscipit soluta. Officia illum suscipit nesciunt a. Magnam rem fugiat voluptate earum corrupti expedita perspiciatis laborum quasi deserunt vel vero rerum obcaecati sequi fugit, enim iure natus quidem pariatur blanditiis aliquam harum minus, provident repellendus ex. Atque commodi, earum beatae placeat id provident ad? Perferendis voluptates magni ratione, maxime animi recusandae corporis facere!</p>
            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil recusandae harum quos dolore nesciunt optio atque nemo architecto sint debitis reiciendis aspernatur laboriosam impedit totam, consequuntur deserunt animi libero aut autem vero aliquam rem voluptatum fugit. Nostrum incidunt veniam consequatur molestias accusamus minima, rerum, repudiandae perspiciatis quam suscipit soluta. Officia illum suscipit nesciunt a. Magnam rem fugiat voluptate earum corrupti expedita perspiciatis laborum quasi deserunt vel vero rerum obcaecati sequi fugit, enim iure natus quidem pariatur blanditiis aliquam harum minus, provident repellendus ex. Atque commodi, earum beatae placeat id provident ad? Perferendis voluptates magni ratione, maxime animi recusandae corporis facere!</p>
            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil recusandae harum quos dolore nesciunt optio atque nemo architecto sint debitis reiciendis aspernatur laboriosam impedit totam, consequuntur deserunt animi libero aut autem vero aliquam rem voluptatum fugit. Nostrum incidunt veniam consequatur molestias accusamus minima, rerum, repudiandae perspiciatis quam suscipit soluta. Officia illum suscipit nesciunt a. Magnam rem fugiat voluptate earum corrupti expedita perspiciatis laborum quasi deserunt vel vero rerum obcaecati sequi fugit, enim iure natus quidem pariatur blanditiis aliquam harum minus, provident repellendus ex. Atque commodi, earum beatae placeat id provident ad? Perferendis voluptates magni ratione, maxime animi recusandae corporis facere!</p>
            <button onClick={onClose} className="text-blue-500 hover:text-blue-700">
                Close Sidebar
            </button>
        </div>
    );
};

export default BottomSidebar;
