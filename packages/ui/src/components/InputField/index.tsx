import './style.scss';

export interface InputFieldProps {
	id: string;
	name?: string;
	value: string;
	type?: 'text' | 'number';
	inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
	inputAttributes?: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		'id' | 'name' | 'value' | 'type' | 'inputMode'
	>;
}

export const InputField: React.FC<InputFieldProps> = ({
	id,
	name,
	value,
	type = 'text',
	inputMode,
	inputAttributes,
}) => {
	return (
		<input
			id={id}
			name={name ?? id}
			className="input-field"
			type={type}
			value={value}
			inputMode={inputMode}
			{...inputAttributes}
		/>
	);
};
