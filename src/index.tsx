import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	StylesStateType,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const DEFAULT_PAGE_STATE = {
	fontFamily: defaultArticleState.fontFamilyOption,
	fontColor: defaultArticleState.fontColor,
	fontSize: defaultArticleState.fontSizeOption,
	backgroundColor: defaultArticleState.backgroundColor,
	contentWidth: defaultArticleState.contentWidth,
};

const App = () => {
	const [pageState, setPageState] =
		useState<StylesStateType>(DEFAULT_PAGE_STATE);

	const onSubmit = (event: any) => {
		setPageState({
			fontFamily: event.fontFamily,
			fontColor: event.fontColor,
			fontSize: event.fontSize,
			backgroundColor: event.backgroundColor,
			contentWidth: event.contentWidth,
		});
	};

	const resetState = () => {
		setPageState(DEFAULT_PAGE_STATE);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamily.value,
					'--font-size': pageState.fontSize.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={onSubmit} resetState={resetState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
