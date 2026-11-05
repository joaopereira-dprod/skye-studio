// Documentação dos componentes do design system SkyeVantage, no formato da Wiki do Studio:
// categoria, descrição, exemplo ao vivo, código, props, faça/evite, tokens e telas que usam.
// Os textos vêm nos dois idiomas ({ pt, en }); os tokens são lidos do CSS do próprio design system.
import { useState } from 'react';
import {
  Icon, Button, IconButton, Input, Select, Textarea, Checkbox, Radio, RadioCard, Tag, Badge, FilterTag,
  Banner, Toast, BoxedTabs, SegmentedControl, DropdownMenu, MetricCard, Table, IconLabelCell, KeyValueTable,
  Pagination, Modal, Breadcrumb,
} from 'skyevantage-design-system';
import { tokensOf } from '../ds.jsx';

const L = (pt, en) => ({ pt, en });
export const CATEGORIES = [
  ['acoes', L('Ações', 'Actions')], ['form', L('Formulário', 'Form')], ['status', L('Status', 'Status')],
  ['feedback', L('Feedback', 'Feedback')], ['nav', L('Navegação', 'Navigation')], ['dados', L('Dados', 'Data')], ['icones', L('Ícones', 'Icons')],
];

const ICONS = ['check', 'minus', 'plus', 'x', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'chevrons-up-down', 'pencil',
  'ellipsis-vertical', 'info', 'circle-check', 'circle-x', 'triangle-alert', 'search', 'calendar', 'loader', 'arrow-left', 'trash', 'copy'];
const wide = (n) => <div className="w-full">{n}</div>;
const w72 = (n) => <div className="w-72">{n}</div>;

function CardDemo() {
  const [v, setV] = useState('report');
  return (<>
    <RadioCard title="Order a measurement report" description="Charges apply." checked={v === 'report'} value="report" onChange={setV} />
    <RadioCard title="Enter measurements manually" description="Type the roof measurements yourself." checked={v === 'manual'} value="manual" onChange={setV} />
  </>);
}
function FilterDemo() {
  const [on, setOn] = useState(true);
  return (<><FilterTag applied={on} onClick={() => setOn(!on)} onRemove={() => setOn(false)}>Chimneys</FilterTag><FilterTag>Skylights</FilterTag></>);
}
function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (<>
    <Button variant="ghost" onClick={() => setOpen(true)}>Open modal</Button>
    <Modal open={open} title="Delete estimate?" size="sm" onClose={() => setOpen(false)}
      footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button variant="critical" onClick={() => setOpen(false)}>Delete</Button></>}>
      This cannot be undone.
    </Modal>
  </>);
}
function TabsDemo() {
  const [v, setV] = useState('a');
  return <BoxedTabs tabs={[{ id: 'a', label: 'Information' }, { id: 'b', label: 'Owner' }, { id: 'c', label: 'System Controls' }]} value={v} onChange={setV} />;
}
function SegDemo() {
  const [v, setV] = useState('manual');
  return <SegmentedControl options={[{ id: 'manual', label: 'Enter manually' }, { id: 'report', label: 'Order a report' }]} value={v} onChange={setV} />;
}

const P = (name, type, def, pt, en) => [name, type, def, L(pt, en)];

export const DOCS = [
  {
    name: 'Button', cat: 'acoes', css: ['sv-btn'], used: ['projetos', 'leads', 'sistemas', 'orcamentos', 'usuarios'],
    desc: L('Dispara uma ação. Seis variantes, três tamanhos, com estados de carregando e desabilitado.', 'Triggers an action. Six variants, three sizes, with loading and disabled states.'),
    code: '<Button variant="primary" iconLeft="plus">New estimate</Button>',
    props: [P('variant', "'primary' | 'secondary' | 'ghost' | 'link' | 'critical' | 'success'", "'primary'", 'Estilo do botão.', 'Button style.'),
      P('size', "'sm' | 'md' | 'lg'", "'md'", 'Altura de 32, 40 ou 48.', 'Height of 32, 40 or 48.'),
      P('iconLeft / iconRight', 'icon name', '–', 'Ícone de 16 a 24px, conforme o tamanho.', 'Icon of 16 to 24px, by size.'),
      P('loading', 'boolean', 'false', 'Mostra o spinner e bloqueia o clique.', 'Shows the spinner and blocks the click.'),
      P('disabled', 'boolean', 'false', 'Bloqueia a ação.', 'Blocks the action.')],
    do: L('Rótulo curto que diz o que acontece: “Salvar orçamento”.', 'A short label that says what happens: “Save estimate”.'),
    dont: L('Dois botões primários na mesma área.', 'Two primary buttons in the same area.'),
    demo: () => (<>
      {['primary', 'secondary', 'ghost', 'link', 'critical', 'success'].map((v) => <Button key={v} variant={v} iconLeft="plus">{v}</Button>)}
      <Button disabled>Disabled</Button><Button loading>Loading</Button>
      <Button size="sm">Small</Button><Button size="lg">Large</Button>
    </>),
  },
  {
    name: 'IconButton', cat: 'acoes', css: ['sv-iconbtn'], used: [],
    desc: L('Botão só com ícone. O rótulo (label) é obrigatório: ele vira o texto para leitores de tela e a dica ao passar o mouse.', 'Icon-only button. The label is required: it becomes the text for screen readers and the hover hint.'),
    code: '<IconButton icon="pencil" label="Edit" />',
    props: [P('icon', 'icon name', '–', 'Ícone exibido.', 'Icon shown.'), P('label', 'string', '–', 'Obrigatório. Nome acessível da ação.', 'Required. Accessible name of the action.'),
      P('variant', "'primary' | 'secondary' | 'ghost' | 'critical' | …", "'secondary'", 'Mesmas variantes do Button.', 'Same variants as Button.'), P('size', "'sm' | 'md' | 'lg'", "'md'", 'Quadrado de 32, 40 ou 48.', 'Square of 32, 40 or 48.')],
    do: L('Use para ações conhecidas: editar, apagar, mais opções.', 'Use for well-known actions: edit, delete, more options.'),
    dont: L('Ícone sem label, ou um ícone que ninguém reconhece.', 'An icon without a label, or an icon nobody recognizes.'),
    demo: () => (<><IconButton icon="pencil" label="Edit" /><IconButton icon="ellipsis-vertical" label="More" variant="ghost" /><IconButton icon="trash" label="Delete" variant="critical" /></>),
  },
  {
    name: 'Input', cat: 'form', css: ['sv-box', 'sv-field'], used: ['leads'], top: true, // top: campos de alturas diferentes alinham pelo topo
    desc: L('Campo de texto com rótulo, texto de ajuda, ícones, complementos (addons) e estado de erro.', 'Text field with label, helper text, icons, addons and an error state.'),
    code: '<Input label="Total Roof Area" addonRight="ft²" helper="Round up" />',
    props: [P('label / helper', 'string', '–', 'Rótulo acima e ajuda abaixo do campo.', 'Label above and helper below the field.'),
      P('error', 'string | true', '–', 'Mensagem de erro. Troca a ajuda e pinta a borda.', 'Error message. Replaces the helper and colors the border.'),
      P('size', "'sm' | 'md' | 'lg'", "'md'", 'Altura do campo.', 'Field height.'), P('iconLeft / iconRight', 'icon name', '–', 'Ícone dentro do campo.', 'Icon inside the field.'),
      P('addonLeft / addonRight', 'string', '–', 'Texto fixo, como “$” ou “ft²”.', 'Fixed text, such as “$” or “ft²”.')],
    do: L('Explique o erro e como corrigi-lo: “Informe o nome do orçamento”.', 'Explain the error and how to fix it: “Enter the estimate name”.'),
    dont: L('Usar só o placeholder no lugar do rótulo.', 'Using only the placeholder instead of the label.'),
    demo: () => (<>{w72(<Input label="Total Roof Area" addonRight="ft²" defaultValue="3000" helper="Round up" />)}{w72(<Input label="Search" iconLeft="search" placeholder="Search leads" />)}{w72(<Input label="Estimate Name" error="Estimate name is required" placeholder="Enter the name" />)}</>),
  },
  {
    name: 'Select', cat: 'form', css: ['sv-select', 'sv-box'], used: [],
    desc: L('Lista de opções nativa, com rótulo, ajuda e estado de erro.', 'Native option list, with label, helper and error state.'),
    code: '<Select label="Roof Type"><option>Standard</option></Select>',
    props: [P('label / helper / error', 'string', '–', 'Igual ao Input.', 'Same as Input.'), P('size', "'sm' | 'md' | 'lg'", "'md'", 'Altura do campo.', 'Field height.'), P('placeholder', 'string', "'Select an option'", 'Texto da opção vazia.', 'Text of the empty option.')],
    do: L('Use quando há 5 ou mais opções fixas.', 'Use when there are 5 or more fixed options.'),
    dont: L('Esconder 2 ou 3 opções num Select: use RadioCard ou SegmentedControl.', 'Hiding 2 or 3 options in a Select: use RadioCard or SegmentedControl.'),
    demo: () => w72(<Select label="Roof Type"><option>Standard</option><option>Mansard</option></Select>),
  },
  {
    name: 'Textarea', cat: 'form', css: ['sv-textarea'], used: [],
    desc: L('Campo de texto de várias linhas, com rótulo e texto de ajuda.', 'Multi-line text field, with label and helper text.'),
    code: '<Textarea label="Notes" helper="0 / 800" />',
    props: [P('label / helper / error', 'string', '–', 'Igual ao Input.', 'Same as Input.'), P('disabled', 'boolean', 'false', 'Bloqueia a edição.', 'Blocks editing.')],
    do: L('Mostre o limite de caracteres no texto de ajuda.', 'Show the character limit in the helper text.'),
    dont: L('Usar para respostas curtas: prefira o Input.', 'Using it for short answers: prefer Input.'),
    demo: () => w72(<Textarea label="Notes" helper="0 / 800" />),
  },
  {
    name: 'Checkbox', cat: 'form', css: ['sv-check'], used: [],
    desc: L('Seleção simples, que aceita estado indeterminado.', 'Simple selection, which supports an indeterminate state.'),
    code: '<Checkbox label="Chimneys" defaultChecked />',
    props: [P('label', 'string', '–', 'Texto ao lado da caixa.', 'Text beside the box.'), P('indeterminate', 'boolean', 'false', 'Mostra o traço de seleção parcial.', 'Shows the partial-selection dash.')],
    do: L('Use para escolher vários itens de uma lista.', 'Use to pick several items from a list.'),
    dont: L('Usar para escolher uma só opção: use Radio.', 'Using it to pick a single option: use Radio.'),
    demo: () => (<><Checkbox label="Checked" defaultChecked /><Checkbox label="Indeterminate" indeterminate /><Checkbox label="Unchecked" /></>),
  },
  {
    name: 'Radio', cat: 'form', css: ['sv-check'], used: [],
    desc: L('Escolha de uma opção dentro de um grupo.', 'Choice of one option within a group.'),
    code: '<Radio label="Option A" name="group" defaultChecked />',
    props: [P('label', 'string', '–', 'Texto ao lado do botão.', 'Text beside the button.'), P('name', 'string', '–', 'Agrupa os radios: só um fica marcado.', 'Groups the radios: only one is checked.')],
    do: L('Deixe uma opção já marcada quando houver um padrão.', 'Leave one option checked when there is a default.'),
    dont: L('Usar um único Radio sozinho.', 'Using a single Radio on its own.'),
    demo: () => (<><Radio label="Option A" name="ds-radio" defaultChecked /><Radio label="Option B" name="ds-radio" /></>),
  },
  {
    name: 'RadioCard', cat: 'form', css: ['sv-radiocard'], used: [],
    desc: L('Escolha de uma opção em formato de cartão, com título e descrição.', 'Choice of one option as a card, with title and description.'),
    code: '<RadioCard title="Order a report" description="Charges apply." checked />',
    props: [P('title / description', 'string', '–', 'Texto do cartão.', 'Card text.'), P('checked', 'boolean', 'false', 'Cartão selecionado.', 'Selected card.'), P('onChange', '(value) => void', '–', 'Chamado com o value do cartão.', 'Called with the card value.')],
    do: L('Use quando cada opção precisa de uma explicação.', 'Use when each option needs an explanation.'),
    dont: L('Mais de 4 cartões na mesma escolha.', 'More than 4 cards in the same choice.'),
    demo: () => <CardDemo />,
  },
  {
    name: 'Tag', cat: 'status', css: ['sv-tag'], used: ['projetos', 'leads', 'sistemas', 'orcamentos', 'usuarios'],
    desc: L('Mostra o estado de um item. A cor carrega o significado e o ícone repete, para não depender só da cor.', 'Shows an item’s state. The color carries the meaning and the icon repeats it, so it does not rely on color alone.'),
    code: '<Tag color="success">Completed</Tag>',
    props: [P('color', "'success' | 'warning' | 'info' | 'error'", "'info'", 'Significado do estado.', 'Meaning of the state.'), P('styleType', "'subtle' | 'solid'", "'subtle'", 'O ícone só aparece no subtle.', 'The icon only shows on subtle.'), P('showIcon', 'boolean', 'true', 'Esconde o ícone.', 'Hides the icon.')],
    do: L('Um mesmo estado sempre com a mesma cor, em todas as telas.', 'The same state always in the same color, on every screen.'),
    dont: L('Usar a cor só pela estética, sem significado.', 'Using the color for looks only, with no meaning.'),
    demo: () => (<><Tag color="success">Completed</Tag><Tag color="warning">Awaiting</Tag><Tag color="info">Scheduled</Tag><Tag color="error">Cancelled</Tag><Tag color="info" styleType="solid">Current</Tag></>),
  },
  {
    name: 'Badge', cat: 'status', css: ['sv-badge'], used: ['usuarios'],
    desc: L('Selo curto e neutro, sem estado associado: perfis, categorias, contagens.', 'Short, neutral label with no state attached: roles, categories, counts.'),
    code: '<Badge color="primary">Admin</Badge>',
    props: [P('color', "'primary' | 'neutral' | 'disabled'", "'neutral'", 'Destaque do selo.', 'Label emphasis.'), P('icon', 'icon name', '–', 'Ícone antes do texto.', 'Icon before the text.')],
    do: L('Use para classificar: perfil, tipo, categoria.', 'Use to classify: role, type, category.'),
    dont: L('Mostrar um estado (aprovado, recusado): use Tag.', 'Showing a state (approved, declined): use Tag.'),
    demo: () => (<><Badge color="primary">Primary</Badge><Badge>Neutral</Badge><Badge color="disabled">Disabled</Badge></>),
  },
  {
    name: 'FilterTag', cat: 'status', css: ['sv-filtertag'], used: [],
    desc: L('Chip de filtro. Aplicado, mostra o botão de remover.', 'Filter chip. When applied, it shows the remove button.'),
    code: '<FilterTag applied onRemove={clear}>Chimneys</FilterTag>',
    props: [P('applied', 'boolean', 'false', 'Filtro ligado.', 'Filter on.'), P('onClick / onRemove', '() => void', '–', 'Ligar e remover o filtro.', 'Turn the filter on and remove it.'), P('icon', 'icon name', '–', 'Ícone antes do texto.', 'Icon before the text.')],
    do: L('Rótulos curtos, de uma ou duas palavras.', 'Short labels, one or two words.'),
    dont: L('Usar para navegar entre seções: use abas.', 'Using it to navigate between sections: use tabs.'),
    demo: () => <FilterDemo />,
  },
  {
    name: 'Banner', cat: 'feedback', css: ['sv-alert'], used: [],
    desc: L('Aviso dentro da página, em largura total. Fica até o problema ser resolvido.', 'In-page notice, full width. Stays until the problem is solved.'),
    code: '<Banner color="warning" title="1 required field left" />',
    props: [P('color', "'success' | 'warning' | 'info' | 'error'", "'info'", 'Tipo do aviso.', 'Type of notice.'), P('title', 'string', '–', 'Frase principal.', 'Main sentence.'), P('onDismiss', '() => void', '–', 'Mostra o botão de fechar.', 'Shows the close button.')],
    do: L('Diga o que fazer: “Falta 1 campo obrigatório”.', 'Say what to do: “1 required field left”.'),
    dont: L('Empilhar vários banners na mesma tela.', 'Stacking several banners on the same screen.'),
    demo: () => wide(<Banner color="warning" title="1 required field left in 1 add-on">Exhaust Vent Type is required.</Banner>),
  },
  {
    name: 'Toast', cat: 'feedback', css: ['sv-alert'], used: [],
    desc: L('Aviso flutuante e passageiro, com botão de fechar. Confirma algo que acabou de acontecer.', 'Floating, passing notice with a close button. Confirms something that just happened.'),
    code: '<Toast color="success" title="Estimate set as active" />',
    props: [P('color', "'success' | 'warning' | 'info' | 'error'", "'info'", 'Tipo do aviso.', 'Type of notice.'), P('onDismiss', '() => void', '–', 'Fecha o aviso.', 'Closes the notice.')],
    do: L('Confirme uma ação: “Orçamento salvo”.', 'Confirm an action: “Estimate saved”.'),
    dont: L('Usar para erros que o usuário precisa corrigir: use Banner.', 'Using it for errors the user must fix: use Banner.'),
    demo: () => <Toast color="success" title="Estimate set as active" onDismiss={() => {}} />,
  },
  {
    name: 'Modal', cat: 'feedback', css: ['sv-modal', 'sv-overlay'], used: [],
    desc: L('Janela que abre sobre a tela e bloqueia o que está atrás, com cabeçalho, corpo e rodapé. Esc fecha.', 'Window that opens over the screen and blocks what is behind it, with header, body and footer. Esc closes it.'),
    code: '<Modal open title="Delete estimate?" onClose={close} footer={…} />',
    props: [P('open / onClose', 'boolean / () => void', '–', 'Controla a abertura.', 'Controls opening.'), P('size', "'sm' | 'md' | 'lg'", "'md'", 'Largura da janela.', 'Window width.'), P('footer', 'node', '–', 'Botões de ação.', 'Action buttons.')],
    do: L('Dizer o que a ação apaga: “Excluir orçamento?”.', 'Say what the action deletes: “Delete estimate?”.'),
    dont: L('Abrir um modal dentro de outro.', 'Opening a modal inside another.'),
    demo: () => <ModalDemo />,
  },
  {
    name: 'BoxedTabs', cat: 'nav', css: ['sv-tab', 'sv-tabs'], figma: '1037-50962', used: [],
    desc: L('Abas em caixa, para trocar de seção na mesma página. A aba atual ganha caixa e cor de link.', 'Boxed tabs, to switch sections on the same page. The current tab gets a box and the link color.'),
    code: '<BoxedTabs tabs={[{ id: "a", label: "Information" }]} value="a" onChange={set} />',
    props: [P('tabs', '{ id, label }[]', '–', 'Até 5 abas.', 'Up to 5 tabs.'), P('value / onChange', 'id / (id) => void', '–', 'Aba atual e troca.', 'Current tab and change.')],
    do: L('Rótulos curtos que descrevem o conteúdo.', 'Short labels that describe the content.'),
    dont: L('Mais de 5 abas, ou abas que mudam de página.', 'More than 5 tabs, or tabs that change page.'),
    demo: () => <TabsDemo />,
  },
  {
    name: 'SegmentedControl', cat: 'nav', css: ['sv-segmented'], used: [],
    desc: L('Alternador entre 2 ou 3 opções que mudam a visão ou o modo.', 'Toggle between 2 or 3 options that change the view or mode.'),
    code: '<SegmentedControl options={[…]} value="manual" onChange={set} />',
    props: [P('options', '{ id, label }[]', '–', 'De 2 a 4 opções.', '2 to 4 options.'), P('value / onChange', 'id / (id) => void', '–', 'Opção atual e troca.', 'Current option and change.')],
    do: L('Opções curtas e mutuamente exclusivas.', 'Short, mutually exclusive options.'),
    dont: L('Usar para enviar um formulário.', 'Using it to submit a form.'),
    demo: () => <SegDemo />,
  },
  {
    name: 'Breadcrumb', cat: 'nav', css: ['sv-breadcrumb'], used: [],
    desc: L('Trilha de navegação. O último item é a página atual e não é um link.', 'Breadcrumb trail. The last item is the current page and is not a link.'),
    code: '<Breadcrumb items={[{ label: "Home" }, { label: "Estimator" }]} />',
    props: [P('items', '{ label, href? }[]', '–', 'Do mais amplo ao mais específico.', 'From the broadest to the most specific.')],
    do: L('Use em telas com 3 níveis ou mais.', 'Use on screens 3 levels deep or more.'),
    dont: L('Repetir o título da página como último item.', 'Repeating the page title as the last item.'),
    demo: () => <Breadcrumb items={[{ label: 'Home' }, { label: 'Estimator' }, { label: 'Create Estimate' }]} />,
  },
  {
    name: 'DropdownMenu', cat: 'nav', css: ['sv-menu', 'sv-option'], used: [],
    desc: L('Menu de opções ou de ações. Serve como lista de seleção e como menu de ações.', 'Menu of options or actions. Works as a selection list and as an action menu.'),
    code: '<DropdownMenu items={[{ id: "edit", label: "Edit" }]} onSelect={run} />',
    props: [P('items', '{ id, label, selected?, critical? }[]', '–', 'Opções do menu. critical pinta de vermelho.', 'Menu options. critical colors it red.'), P('onSelect', '(id) => void', '–', 'Chamado ao escolher.', 'Called on choose.')],
    do: L('Ações destrutivas por último, marcadas como critical.', 'Destructive actions last, marked critical.'),
    dont: L('Mais de 7 opções sem agrupar.', 'More than 7 options without grouping.'),
    demo: () => <div className="w-56"><DropdownMenu items={[{ id: 'edit', label: 'Edit' }, { id: 'copy', label: 'Make a copy' }, { id: 'del', label: 'Delete', critical: true }]} /></div>,
  },
  {
    name: 'MetricCard', cat: 'dados', css: ['sv-metric'], used: ['projetos'],
    desc: L('Número de destaque com rótulo, para o resumo no topo de uma tela.', 'Key figure with a label, for the summary at the top of a screen.'),
    code: '<MetricCard label="Total Cost" value="$450.00" />',
    props: [P('label', 'string', '–', 'O que o número mede.', 'What the number measures.'), P('value', 'string', '–', 'O número, já formatado.', 'The number, already formatted.')],
    do: L('Um número por cartão, com o rótulo dizendo a unidade.', 'One number per card, with the label giving the unit.'),
    dont: L('Colocar gráficos ou textos longos no cartão.', 'Putting charts or long text in the card.'),
    demo: () => <div className="w-64"><MetricCard label="Total Cost" value="$450.00" /></div>,
  },
  {
    name: 'Table', cat: 'dados', css: ['sv-table', 'sv-th', 'sv-td', 'sv-tablewrap'], used: ['projetos', 'leads', 'sistemas', 'orcamentos', 'usuarios'],
    desc: L('Tabela com colunas configuráveis. Cada célula pode ser texto, Tag, Badge, ícone ou botão.', 'Table with configurable columns. Each cell can be text, Tag, Badge, icon or button.'),
    code: '<Table columns={[{ key: "name", header: "Name" }]} rows={rows} />',
    props: [P('columns', '{ key, header, width?, sortable?, render?(row) }[]', '–', 'Define as colunas e como cada célula aparece.', 'Defines the columns and how each cell looks.'), P('rows', 'object[]', '–', 'Uma linha por objeto.', 'One row per object.'), P('currentRow', '(row) => boolean', '–', 'Destaca a linha atual.', 'Highlights the current row.')],
    do: L('Colunas curtas, com a coluna mais importante primeiro.', 'Short columns, with the most important column first.'),
    dont: L('Mais de 7 colunas: esconda detalhes numa tela própria.', 'More than 7 columns: move details to their own screen.'),
    demo: () => wide(<Table
      columns={[
        { key: 'name', header: 'Estimate Name', sortable: true, render: (r) => <span className="sv-cell">{r.name}{r.current && <Tag color="info" showIcon={false}>Current</Tag>}</span> },
        { key: 'by', header: 'Created By', sortable: true }, { key: 'b', header: 'Option B', sortable: true },
        { key: 'p', header: 'Provider', render: () => <IconLabelCell icon="calendar">Zoom</IconLabelCell> },
        { key: 'm', header: '', align: 'right', render: () => <IconButton icon="ellipsis-vertical" label="Row menu" variant="ghost" size="sm" /> },
      ]}
      rows={[{ id: 1, name: 'Design Ref - Standard', current: true, by: 'joao@popstand.com', b: '$450.00' }, { id: 2, name: 'Design Ref - Standard', by: 'joao@popstand.com', b: '$430.00' }]}
      currentRow={(r) => r.current} />),
  },
  {
    name: 'KeyValueTable', cat: 'dados', css: ['sv-td--kv', 'sv-table'], used: [],
    desc: L('Pares de rótulo e valor, com botão de editar opcional. Serve para detalhes de um lead ou o resumo de um orçamento.', 'Label and value pairs, with an optional edit button. Works for lead details or an estimate breakdown.'),
    code: '<KeyValueTable items={[{ label: "Labor", value: "$450.00" }]} />',
    props: [P('items', '{ label, value, onEdit? }[]', '–', 'Com onEdit aparece o botão de editar.', 'With onEdit the edit button shows.')],
    do: L('Rótulos curtos e valores já formatados.', 'Short labels and already formatted values.'),
    dont: L('Usar para listas longas: use Table.', 'Using it for long lists: use Table.'),
    demo: () => wide(<KeyValueTable items={[{ label: 'Flat Fee', value: '$0.00', onEdit: () => {} }, { label: 'Labor', value: '$450.00', onEdit: () => {} }]} />),
  },
  {
    name: 'Pagination', cat: 'dados', css: ['sv-pagination'], used: [],
    desc: L('Navegação entre páginas de uma tabela, com a escolha de linhas por página.', 'Navigation between table pages, with a rows-per-page choice.'),
    code: '<Pagination page={1} pageCount={3} onPage={set} />',
    props: [P('page / pageCount', 'number', '–', 'Página atual e total.', 'Current page and total.'), P('rowsPerPage', 'number', '10', 'Linhas por página.', 'Rows per page.'), P('onPage / onRowsPerPage', 'function', '–', 'Chamados ao trocar.', 'Called on change.')],
    do: L('Coloque logo abaixo da tabela.', 'Place it right below the table.'),
    dont: L('Mostrar quando há uma só página.', 'Showing it when there is only one page.'),
    demo: () => wide(<Pagination page={1} pageCount={3} />),
  },
  {
    name: 'Icon', cat: 'icones', css: ['sv-icon'], used: ['projetos', 'leads', 'sistemas', 'orcamentos', 'usuarios'],
    desc: L('Ícones só de contorno, nunca preenchidos. Herdam a cor do texto.', 'Outline-only icons, never filled. They inherit the text color.'),
    code: '<Icon name="plus" size={16} />',
    props: [P('name', 'icon name', '–', 'Um dos ícones do conjunto.', 'One of the icons in the set.'), P('size', 'number', '16', 'Tamanho em pixels.', 'Size in pixels.')],
    do: L('Use o mesmo ícone para a mesma ideia, em todas as telas.', 'Use the same icon for the same idea, on every screen.'),
    dont: L('Misturar ícones preenchidos com os de contorno.', 'Mixing filled icons with outline ones.'),
    demo: () => (<div className="grid w-full gap-[var(--space-12)]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(96px,1fr))' }}>
      {ICONS.map((n) => (<div key={n} className="sv flex flex-col items-center gap-[var(--space-8)] p-[var(--space-8)]"><Icon name={n} size={24} /><span className="t-caption-lg">{n}</span></div>))}
    </div>),
  },
].map((d) => ({ ...d, tokens: tokensOf(...d.css) }));
