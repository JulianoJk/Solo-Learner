import React from 'react';
import Selection, { Option } from '../Selection/Selection.component';

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

  // Split the text into parts
  const textWithPlaceholders = text.split('___');

  // Define options for each placeholder
  const optionsSets: Option[][] = [
    [
      { label: 'English', isCorrect: false },
      { label: 'German', isCorrect: false },
      { label: 'Italian', isCorrect: false },
    ],
    [
      { label: 'French', isCorrect: false },
      { label: 'Spanish', isCorrect: false },
      { label: 'Portuguese', isCorrect: false },
    ],
    [
      { label: 'Japanese', isCorrect: false },
      { label: 'Chinese', isCorrect: false },
      { label: 'Korean', isCorrect: false },
    ],
    // can you add 10 more options here?
    [
      { label: 'Russian', isCorrect: false },
      { label: 'Swedish', isCorrect: false },
      { label: 'Dutch', isCorrect: false },
    ],
    [
      { label: 'Norwegian', isCorrect: false },
      { label: 'Danish', isCorrect: false },
      { label: 'Finnish', isCorrect: false },
    ],
    [
      { label: 'Greek', isCorrect: false },
      { label: 'Turkish', isCorrect: false },
      { label: 'Arabic', isCorrect: false },
    ],
    [
      { label: 'Hindi', isCorrect: false },
      { label: 'Urdu', isCorrect: false },
      { label: 'Bengali', isCorrect: false },
    ],
    [
      { label: 'Punjabi', isCorrect: false },
      { label: 'Marathi', isCorrect: false },
      { label: 'Tamil', isCorrect: false },
    ],
    [
      { label: 'Telugu', isCorrect: false },
      { label: 'Gujarati', isCorrect: false },
      { label: 'Kannada', isCorrect: false },
    ],
    [
      { label: 'Malayalam', isCorrect: false },
      { label: 'Odia', isCorrect: false },
      { label: 'Assamese', isCorrect: false },
    ],
  ];

  // Handle selection change
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
          {/* Check if optionsSets[index] is defined before rendering Selection */}
          {optionsSets[index] && (
            <Selection
              options={optionsSets[index]}
              placeholder="Select Option"
              onSelect={(selectedOption) => handleSelect(selectedOption, index)}
              index={index}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Theory;
