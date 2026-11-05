// Cenários simulados do fluxo de autenticação. O protótipo não tem servidor: o resultado depende do que a pessoa digita.
// Esta lista também alimenta a página “Fluxo de autenticação” da Wiki, então só mude aqui.
export const DEMO = { email: 'joao.pereira@popstand.com', password: 'Skye@2025' };
export const SCENARIOS = {
  loginOk: DEMO,
  loginDisabled: { email: 'inativo@popstand.com' },
  offline: { email: 'offline@popstand.com' },
  maxAttempts: 3,
  reusedPassword: DEMO.password, // a senha que a conta já usa
  invitedBy: 'Carlos Ribeiro',
};
