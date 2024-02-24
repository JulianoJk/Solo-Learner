import React from 'react';
import Selection from '../Selection/Selection.component';

const Theory = () => {
  const text = `Lorem ipsum dolor si ___ adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae ___ ___ laborum
numquam ___ harum quisquam eius ___ odit fugiat ___ fuga praesentium
optio, eaque rerum! Provident similique ___ nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias ___ ___ aliquam
nihil, eveniet ___ culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas ___. Reprehenderit,
quia. ___ neque error repudiandae fuga? ___ laudantium molestias eos 
sapiente officiis modi at ___ excepturi expedita sint? Sed quibusdam
___ alias error harum maxime adipisci amet ___. Perspiciatis 
minima nesciunt dolorem! Officiis iure rerum ___ a cumque velit 
quibusdam sed amet ___. Sit laborum ab, eius fugit doloribus tenetur 
fugiat, temporibus enim commodi ___ libero magni ___ quod quam 
___! Commodi minima excepturi repudiandae velit hic maxime
doloremque. Quaerat provident commodi consectetur veniam similique ad 
earum omnis ipsum saepe, voluptas, hic ___ pariatur est ___ 
fugiat, dolorum eligendi quam ___ excepturi mollitia maiores labore 
suscipit quas? ___, placeat. Voluptatem quaerat non architecto ab laudantium
modi minima sunt esse temporibus sint culpa, ___ aliquam numquam 
totam ratione ___ quod exercitationem fuga. Possimus ___ earum veniam`;

  const options = [
    { label: 'English', isCorrect: false },
    { label: 'German', isCorrect: false },
    { label: 'Italian', isCorrect: false },
    { label: 'French', isCorrect: false },
    { label: 'Polish', isCorrect: false },
  ];

  const textWithPlaceholders = text.split('___');

  const handleSelect = (selectedOption: string, index: number) => {
    console.log(
      `Selected option for placeholder ${index + 1}: ${selectedOption}`,
    );
  };

  return (
    <div>
      {textWithPlaceholders.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < textWithPlaceholders.length - 1 && (
            <Selection
              options={options}
              placeholder="Select Option"
              onSelect={handleSelect}
              index={index}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Theory;
