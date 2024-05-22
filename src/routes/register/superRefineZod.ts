const registrationFormSchema = z
	.object({
		firstName: firstNameValidator,
		lastName: lastNameValidator,
		email: z.string().optional(), // Keeping both email and phone optional on base schema and validating values inside `superRefine`
		phone: z.string().optional(),
		postalCode: canadianPostalCodeValidator,
		specificGroupServices: z.string().optional(),
		isOntarioResident: booleanRadioGroupValidator,
		isAllowedToWorkInCanada: booleanRadioGroupValidator,
		isStudent: booleanRadioGroupValidator,
		hasAgreedToTermsAndPolicies: z.boolean()
	})
	// Perform conditional validation to ensure either a valid email or phone number is provided.
	.superRefine(({ email, phone }, refinementContext) => {
		if (email === '' && phone !== '' && !getIsValidMobilePhone(phone ?? '')) {
			return refinementContext.addIssue({
				code: z.ZodIssueCode.custom,
				message: i18n.t('forms.validations.invalid.phone'),
				path: ['phone']
			});
		}

		if (email !== '' && phone === '' && !getIsValidEmail(email ?? '')) {
			return refinementContext.addIssue({
				code: z.ZodIssueCode.custom,
				message: i18n.t('forms.validations.invalid.email'),
				path: ['email']
			});
		}
	});
