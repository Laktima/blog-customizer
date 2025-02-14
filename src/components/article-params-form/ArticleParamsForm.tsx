import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { FormEvent, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';

import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

export type StylesStateType = {
	fontSize: OptionType;
	fontFamily: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

type ArticleParamsFormProps = {
	onSubmit: (value: any) => void;
	resetState: () => void;
};

const DEFAULT_FORM_STATE = {
	fontSize: fontSizeOptions[0],
	fontFamily: fontFamilyOptions[0],
	fontColor: fontColors[0],
	backgroundColor: backgroundColors[0],
	contentWidth: contentWidthArr[0],
};

export const ArticleParamsForm = ({
	onSubmit,
	resetState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<StylesStateType>(DEFAULT_FORM_STATE);

	const handleIsOpenToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleFontFamilyChange = (option: OptionType) => {
		setFormState({
			...formState,
			fontFamily: option,
		});
	};

	const handleFontColorChange = (option: OptionType) => {
		setFormState({
			...formState,
			fontColor: option,
		});
	};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState({
			...formState,
			fontSize: option,
		});
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setFormState({
			...formState,
			backgroundColor: option,
		});
	};

	const handleContentWidthChange = (option: OptionType) => {
		setFormState({
			...formState,
			contentWidth: option,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formState);
	};

	const handleReset = () => {
		setFormState(DEFAULT_FORM_STATE);
		resetState();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleIsOpenToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.optionsContainer}>
						<Text size={31} weight={800}>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
						<div>
							<Text size={12} weight={800}>
								ШРИФТ
							</Text>
							<Select
								selected={formState.fontFamily}
								options={fontFamilyOptions}
								onChange={handleFontFamilyChange}
							/>
						</div>
						<RadioGroup
							name='fontSize'
							title='РАЗМЕР ШРИФТА'
							selected={formState.fontSize}
							options={fontSizeOptions}
							onChange={handleFontSizeChange}
						/>
						<div>
							<Text size={12} weight={800}>
								ЦВЕТ ШРИФТА
							</Text>
							<Select
								selected={formState.fontColor}
								options={fontColors}
								onChange={handleFontColorChange}
							/>
						</div>
						<Separator />
						<div>
							<Text size={12} weight={800}>
								ЦВЕТ ФОНА
							</Text>
							<Select
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={handleBackgroundColorChange}
							/>
						</div>
						<div>
							<Text size={12} weight={800}>
								ШИРИНА КОНТЕНТА
							</Text>
							<Select
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={handleContentWidthChange}
							/>
						</div>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
