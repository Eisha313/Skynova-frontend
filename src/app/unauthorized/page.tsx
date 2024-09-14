// pages/certificates.tsx
import React from 'react';

import ResultList from '@/app/components/results/ResultList';
import SuggestionForm from '@/app/components/suggestion/Suggestionform';
import Unauthorized from '../components/guard/unauthorized';

const AddSuggestionPage: React.FC = () => {
  
    
    
      return (
        
          
            <main className="flex-1 p-4 bg-white overflow-auto">
              <Unauthorized />
            </main>
         
      );
    };
    
    export default AddSuggestionPage;
    



