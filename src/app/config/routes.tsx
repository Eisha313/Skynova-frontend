


export const roleBasedRoutes = {
    Admin: ['/dashboard', 'view-resource', '/reports','/viewuser','/viewuser/[id]/edit','/addaviator',
      '/viewjets','/verbalquiz','/viewCommunityQuestions','/dashboard','/suggestion','results','/setpassword','results','quizPage','/notification','/nonverbalquiz','forgetpassword','complaints','community','CertificatesPage','/competency/form'],
    Aviator: ['/login','/signup','/userRender/addCommunityQuestion',
      '/userRender/chat/[id]',
       '/userRender/viewCommunityQuestions','/userRender/viewCommunityQuestions/[id]/questionDetail','/forgetpassword','/setpassword','/chat','userRender/chat/[id]' ],
  };
  
  export const publicRoutes = ['/login', '/signup','/']; 
  