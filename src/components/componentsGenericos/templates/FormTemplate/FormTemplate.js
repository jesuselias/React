import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import styled, {useTheme} from 'styled-components';
import {Text} from '_atoms';
import {useDomain} from '_hooks';
import { Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Modal,TouchableList} from '_molecules';
import ImagePicker from 'react-native-image-crop-picker';

const FormView = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5%;
`;

const FormContent = styled.View`
    flex: 1;
    margin-bottom: 10px;
`;

const ControllerWrapper = styled.View`
    margin-top: ${({fields}) => fields > 2 ? '1%' : '3.5%'};
    margin-bottom: ${({setMargin}) => setMargin ? '6%' : '2%'};
    position: relative;
`;

const TextWarn = styled(Text)`
    text-align: left;
    font-size: ${({theme}) => theme.fontSizeXS};
    margin-top: 0.5%;
    color: ${({theme}) => theme.alertColor};
`;

const FormLabel = styled(Text)`
    text-align: left;
    font-family: ${({theme}) => theme.fontFamilyBold};
    font-size: ${({theme}) => theme.fontSizeSM};   
    margin-bottom: 2%;
    position: relative;
    top: 0;
`;

const FormTextInput = styled.TextInput`
    border: ${({theme}) => `1px solid ${theme.darkgrayColor}`};
    border-top-width: ${({floatLabel}) => floatLabel ? `0` : `1px`};
    border-left-width: ${({floatLabel}) => floatLabel ? `0` : `1px`};
    border-right-width: ${({floatLabel}) => floatLabel ? `0` : `1px`};
    border-bottom-width: 1px;    
    border-radius: 3px;
    padding: ${({isIos,floatLabel}) => isIos ? (floatLabel ? '10px 0' : '10px 10px') : (floatLabel ? '5px 0' : '5px 10px')};
    color: ${({theme}) => theme.blackColor};
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.primaryColor};
  opacity: ${({disabled}) => disabled ? '0.75' : '1'};
  border-radius: 10px;
  padding: 5%;
  margin-top: 5%;
`;

const UploadImgButton = styled(PrimaryButton)`
    background-color: ${({theme}) => theme.whiteColor};
    border: ${({theme}) => `1px solid ${theme.darkgrayColor}`};
    margin-top: 1%;
`;

const PrimaryButtonText = styled(Text)`
  color: ${({theme}) => theme.whiteColor};
  font-size: ${({theme}) => theme.fontSizeMD};
`;

const UploadImgButtonText = styled(PrimaryButtonText)`
  color: ${({theme}) => theme.darkgrayColor};
`;

const SuccessMsg = styled(Text)`
    border: ${({theme}) => `1px solid ${theme.successColor}`};
    color: ${({theme}) => theme.successColor};
    padding: 3%;
    border-radius: 3px;
    margin-bottom: ${({fields}) => fields > 2 ? '6%' : '2%'};
`;

const ErrorMsg = styled(SuccessMsg)`
    border: ${({theme}) => `1px solid ${theme.alertColor}`};
    color: ${({theme}) => theme.alertColor};
`;

FORM_RULES = {
    letterRule: (str) => ({
        required: str, 
        pattern: /^[a-z A-Zá-úÁ-Ú]*$/,
        patternMsg: 'Sólo letras están permitidas',
    }),
    emailRule: (str) => ({
        required: str, 
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
        patternMsg: 'Debe tener un formato de correo válido. (example@example.com)',
    }),
    numberRule: (str) => ({
        required: str, 
        pattern: /^[0-9]*$/,
        patternMsg: 'Sólo números están permitidos',
    }),
    textRule: (str) => ({
        required: str
    }),
    passwordRule: (str) => ({
        required: str,
        pattern: /^[^ ]*$/,
        patternMsg: 'No se permiten espacios en blanco',
    }),
};

function FormTemplate({
    type = 'login',
    useCase = 'user_log_in',
    button,
    buttonSending,
    controllers = [],
    floatLabel = false,
    successMessage,
    errorMessage,
    manageImg = false,
    editMode = null,
    uploadImgText = "Adjuntar imágen",
    onRequestSucceed = () => {},
    onScrollTop = () => {},
}) {
  const theme = useTheme();
  const isIos = Platform.OS === "ios";

  const [apiResponse, apiUseCase] = useDomain(useCase);

  const [showSuccess, setShowSuccess] = useState('');
  const [showError, setShowError] = useState('');
  const [isImgModalVisible, setIsImgModalVisible] = useState(false);
  const successMsgRef = useRef();
  const errorMsgRef = useRef();

  const { control, handleSubmit, errors, reset, setValue } = useForm();

  const nameRef = useRef();
  const [nameFocus, setNameFocus] = useState(false);
  const addressRef = useRef();
  const [addressFocus, setAddressFocus] = useState(false);
  const emailRef = useRef();
  const [emailFocus, setEmailFocus] = useState(false);
  const phoneRef = useRef();
  const [phoneFocus, setPhoneFocus] = useState(false);
  const messageRef = useRef();
  const [messageFocus, setMessageFocus] = useState(false);
  const passwordRef = useRef();
  const [passwordFocus, setPasswordFocus] = useState(false);
  const confirmPasswordRef = useRef();
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const uploadImgRef = useRef();
  const [imageBase64, setImageBase64] = useState('');

  useEffect(() => {
    if (editMode) {
        Object.keys(editMode).map(userAttr => {
            if (userAttr !== "id" && userAttr !== "state" && userAttr !== "city") 
                setValue(userAttr, editMode[userAttr]);
            if (userAttr === "picture") setImageBase64(editMode[userAttr]);
        });
    }
  }, [editMode]);

  const onSubmit = data => {  
      if (manageImg) {
        if (!editMode && data.password !== data.passwordconfirm) {
            setShowError('¡Las contraseñas no coinciden!');
            onScrollTop();
            hideStatus('error');
        }
        else {
            const data_ = {
                ...data, 
                picture: { source: imageBase64, ...(editMode ? { new: imageBase64.includes(";base64,") ? 1 : 0 } : {}) },
                ...(editMode 
                    ? {
                        id: editMode.id,
                        state: editMode.state.id,
                        city: editMode.city.id,
                      } 
                    : {}
                ),
            };
            apiUseCase(data_);
            ImagePicker.clean().then(() => {}).catch(e => {});
        }
      } else {
        apiUseCase(data);
      }
  }

  const timeInterval = useRef(null);

  const hideStatus = useCallback((type) => {
    clearTimeout(timeInterval.current);

    timeInterval.current = setTimeout(() => {
        if (type === "success") setShowSuccess('');
        else setShowError('');
    }, 3000);
  }, [showSuccess, showError]);

  const getResetObj = () => {
    const obj = {};
    controllers.map(controller => {
        obj[controller.type] = '';
    });
    return obj;
  };

  useEffect(() => {
      if (apiResponse.data && !apiResponse.loading) {
        if (!apiResponse.error && !apiResponse.data.responseError) {
            const sccssMsg = apiResponse.data.msg;
            setShowSuccess(sccssMsg && sccssMsg.length > 0 && sccssMsg !== 'show_message_by_param' ? sccssMsg : successMessage);
            onScrollTop();
            hideStatus('success');
            if (!editMode) {
                const obj = getResetObj();
                reset(obj);   
            }
            onRequestSucceed();
        }
        else {
            const errMsg = apiResponse.data.responseError;
            setShowError(errMsg && errMsg.length > 0 && errMsg !== 'show_message_by_param' ? errMsg : errorMessage);
            onScrollTop();
            hideStatus('error');
        }
      }    

      return () => {
        clearTimeout(timeInterval.current);
      };
  }, [apiResponse]);

//   console.log("API RESPONDING",apiResponse);

  const setMargin = type !== 'contact';

  const renderControllers = () => {
    const contrs = controllers.map( controller => {
        switch (controller.type) {
            case 'name':
                return (
                    <ControllerWrapper setMargin={setMargin} fields={controllers.length} key={controller.address ? 'address' : controller.type}>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => (
                            <>
                            <FormLabel style={!floatLabel ? {} : {
                                position: 'absolute',
                                ...(controller.address 
                                    ? { top: addressFocus || value.length > 0 ? -12 : 15, } 
                                    : { top: nameFocus || value.length > 0 ? -12 : 15 }
                                ),
                                ...(controller.address 
                                    ? { color: addressFocus || value.length > 0 ? theme.blackColor : theme.darkgrayColor } 
                                    : { color: nameFocus || value.length > 0 ? theme.blackColor : theme.darkgrayColor }
                                ),
                            }}>
                                {controller.label ? controller.label : (controller.address ? 'Dirección' : 'Nombre')}
                            </FormLabel>
                            <FormTextInput
                                ref={controller.address ? addressRef : nameRef}
                                isIos={isIos}
                                floatLabel={floatLabel}
                                placeholder={floatLabel ? null : (controller.label ? controller.label : (controller.address ? 'Dirección' : 'Nombre'))}
                                placeholderTextColor={theme.darkgrayColor}
                                onFocus={() => {
                                    if (controller.address) setAddressFocus(true);
                                    else setNameFocus(true);
                                }}
                                onBlur={() => {
                                    if (controller.address) setAddressFocus(false);
                                    else setNameFocus(false);
                                }}
                                onChangeText={value => onChange(value)}
                                value={value}
                                textContentType={controller.address ? "addressCityAndState" : "name"}
                                editable={typeof controller.editable === "undefined" ? true : controller.editable}
                            />
                            </>
                        )}
                        name={controller.address ? "address" : "name"}
                        rules={{ 
                            ...(
                                controller.address 
                                    ? FORM_RULES.letterRule(controller.requiredMsg ? controller.requiredMsg : 'El nombre es requerido') 
                                    : FORM_RULES.textRule('La dirección es requerida')
                            )
                        }}
                        defaultValue=""
                        onFocus={() => {
                            if (controller.address) addressRef.current.focus();
                            else nameRef.current.focus();
                        }}
                    />
                    {controller.address 
                    ? errors.address && <TextWarn>{errors.address.message}</TextWarn>
                    : errors.name && <TextWarn>{errors.name.type === 'pattern' ? FORM_RULES.letterRule().patternMsg : errors.name.message}</TextWarn>}
                    </ControllerWrapper>
                );

            case 'email':
                return (
                    <ControllerWrapper setMargin={setMargin} fields={controllers.length} key={controller.type}>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => (
                            <>
                            <FormLabel style={!floatLabel ? {} : {
                                position: 'absolute',
                                top: emailFocus || value.length > 0 ? -12 : 15,
                                color: emailFocus || value.length > 0 ? theme.blackColor : theme.darkgrayColor
                            }}>
                                {controller.label ? controller.label : 'Correo'}
                            </FormLabel>
                            <FormTextInput
                                ref={emailRef}
                                isIos={isIos}
                                floatLabel={floatLabel}
                                placeholder={floatLabel ? null : (controller.label ? controller.label : 'Correo')}
                                placeholderTextColor={theme.darkgrayColor}
                                onFocus={() => {
                                    setEmailFocus(true);
                                }}
                                onBlur={() => {
                                    setEmailFocus(false);
                                }}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                editable={typeof controller.editable === "undefined" ? true : controller.editable}
                            />
                            </>
                        )}
                        name="email"
                        rules={{ 
                            ...FORM_RULES.emailRule('El correo es requerido')                    
                        }}
                        defaultValue=""
                        onFocus={() => {
                            emailRef.current.focus();                            
                        }}
                    />
                    {errors.email && <TextWarn>{errors.email.type === 'pattern' ? FORM_RULES.emailRule().patternMsg : errors.email.message}</TextWarn>}
                    </ControllerWrapper>
                );

            case 'phone':
                return (
                    <ControllerWrapper setMargin={setMargin} fields={controllers.length} key={controller.type}>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => (
                            <>
                            <FormLabel style={!floatLabel ? {} : {
                                position: 'absolute',
                                top: phoneFocus || value.length > 0 ? -12 : 15,
                                color: phoneFocus || value.length > 0 ? theme.blackColor : theme.darkgrayColor
                            }}>
                                {controller.label ? controller.label : 'Teléfono'}
                            </FormLabel>
                            <FormTextInput
                                ref={phoneRef}
                                isIos={isIos}
                                floatLabel={floatLabel}
                                placeholder={floatLabel ? null : (controller.label ? controller.label : 'Teléfono')}
                                placeholderTextColor={theme.darkgrayColor}
                                onFocus={() => {
                                    setPhoneFocus(true);
                                }}
                                onBlur={() => {
                                    setPhoneFocus(false);
                                }}
                                onChangeText={value => onChange(value)}
                                value={value}
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                editable={typeof controller.editable === "undefined" ? true : controller.editable}
                            />
                            </>
                        )}
                        name="phone"
                        rules={{ 
                            ...FORM_RULES.numberRule('El teléfono es requerido')
                        }}
                        defaultValue=""
                        onFocus={() => {
                            phoneRef.current.focus();
                        }}
                    />
                    {errors.phone && <TextWarn>{errors.phone.type === 'pattern' ? FORM_RULES.numberRule().patternMsg : errors.phone.message}</TextWarn>}
                    </ControllerWrapper>
                );

            case 'password':
                return (
                    <ControllerWrapper setMargin={setMargin} fields={controllers.length} key={`${controller.type}${controller.confirm ? 'confirm' : ''}`}>
                    <Controller
                        control={control}
                        render={({ onChange, value }) => (
                            <>
                            <FormLabel style={!floatLabel ? {} : {
                                position: 'absolute',
                                ...(controller.confirm 
                                    ? { top: confirmPasswordFocus || value.length > 0 ? -12 : 15 } 
                                    : { top: passwordFocus || value.length > 0 ? -12 : 15 }
                                ),
                                ...(controller.confirm 
                                    ? { color: confirmPasswordFocus || value.length > 0 ? theme.blackColor : theme.darkgrayColor } 
                                    : { color: passwordFocus || value.length > 0 ? theme.blackColor : theme.darkgrayColor }
                                ),
                            }}>
                                {controller.label ? controller.label : 'Contraseña'}
                            </FormLabel>
                            <FormTextInput
                                ref={controller.confirm ? confirmPasswordRef : passwordRef}
                                isIos={isIos}
                                floatLabel={floatLabel}
                                placeholder={floatLabel ? null : 'Contraseña'}
                                placeholderTextColor={theme.darkgrayColor}
                                onFocus={() => {
                                    if (controller.confirm) setConfirmPasswordFocus(true);
                                    else setPasswordFocus(true);
                                }}
                                onBlur={() => {
                                    if (controller.confirm) setConfirmPasswordFocus(false);
                                    else setPasswordFocus(false);
                                }}
                                onChangeText={value => onChange(value)}
                                value={value}
                                textContentType="password"
                                secureTextEntry={true}
                                editable={typeof controller.editable === "undefined" ? true : controller.editable}
                            />
                            </>
                        )}
                        name={`password${controller.confirm ? 'confirm' : ''}`}
                        rules={{ 
                            ...FORM_RULES.passwordRule(controller.requiredMsg ? controller.requiredMsg : 'La contraseña es requerida')
                        }}
                        defaultValue=""
                        onFocus={() => {
                            if (controller.confirm) confirmPasswordRef.current.focus();
                            else passwordRef.current.focus();
                        }}
                    />
                    {controller.confirm 
                    ? errors.passwordconfirm && <TextWarn>{errors.passwordconfirm.type === 'pattern' ? FORM_RULES.passwordRule().patternMsg : errors.passwordconfirm.message}</TextWarn>
                    : errors.password && <TextWarn>{errors.password.type === 'pattern' ? FORM_RULES.passwordRule().patternMsg : errors.password.message}</TextWarn>}
                    </ControllerWrapper>
                );

            default: // text area
                return (
                    <ControllerWrapper setMargin={setMargin} fields={controllers.length} key={controller.type}>
                    <Controller
                        control={control}                
                        render={({ onChange, onBlur, value }) => (
                            <>
                            <FormLabel>Mensaje</FormLabel>
                            <FormTextInput
                                ref={messageRef}
                                isIos={isIos}
                                style={{minHeight: 85, maxHeight: 85}}
                                placeholder="Mensaje"
                                placeholderTextColor={theme.darkgrayColor}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                                editable={typeof controller.editable === "undefined" ? true : controller.editable}
                            />
                            </>
                        )}
                        name="message"
                        rules={{ ...FORM_RULES.textRule('Debe escribir un mensaje') }}
                        defaultValue=""
                        onFocus={() => {
                            messageRef.current.focus();
                        }}
                    />
                    {errors.message && <TextWarn>{errors.message.message}</TextWarn>}
                    </ControllerWrapper>
                );
        }
    });

    return contrs;
  };

  const manageImgResponse = ({mime, data}) => {
    const b64 = `data:${mime};base64,${data}`;
    setImageBase64(b64);
    setIsImgModalVisible(false);
    setValue("picture", Math.random().toString(36).substring(2), { shouldValidate: true });
  };

  const manageEmptyImg = () => {
    setImageBase64('');
    setValue("picture", "", { shouldValidate: true });
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        compressImageQuality: 0.7,
    }).then(image => {        
        manageImgResponse(image);
    }).catch(() => { manageEmptyImg() });    
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        compressImageQuality: 0.7,
    }).then(image => {
        manageImgResponse(image);
    }).catch(() => { manageEmptyImg() });
  };

  const handleUploadImgFrom = ({value}) => {
      if (value === "camera") {
        takePhotoFromCamera();
      } else {
        choosePhotoFromLibrary();
      }
  };

  const renderActionBtns = () => {
    const btns = [
        { type: 'camera', text: 'Tomar una foto' },
        { type: 'library', text: 'Escoger de la galería' }
    ].map(({type, text}) => {
        return {
            name: text,
            value: type,
            isSelected: false,
        };
    });
  
      return (
        <TouchableList
          items={btns}
          onSelectItem={handleUploadImgFrom}
        />
      );
  };

  return (
    <>
    <FormView>
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <FormContent>
                    {showSuccess.length > 0 ? <SuccessMsg ref={successMsgRef} fields={controllers.length}>{showSuccess}</SuccessMsg> : <></>}
                    {showError.length > 0 ? <ErrorMsg ref={errorMsgRef} fields={controllers.length}>{showError}</ErrorMsg> : <></>}

                    {renderControllers()}
                </FormContent>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        {manageImg && (
            <>            
            <Controller
                control={control}                
                render={({ onChange, value }) => (
                    <>
                    <FormTextInput
                        ref={uploadImgRef}
                        style={{height: 0, width: 0, opacity: 0}}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                    <UploadImgButton disabled={apiResponse.loading} onPress={() => { setIsImgModalVisible(!isImgModalVisible) }}>
                        <UploadImgButtonText>{imageBase64.length > 0 ? 'Cambiar imágen' : uploadImgText}</UploadImgButtonText>
                    </UploadImgButton>
                    </>
                )}
                name="picture"
                rules={{ required: 'Debe adjuntar una imágen' }}
                defaultValue=""
                onFocus={() => {
                    uploadImgRef.current.focus();
                }}
            />
            {errors.picture && <TextWarn>{errors.picture.message}</TextWarn>}
            </>
        )}

        <PrimaryButton disabled={apiResponse.loading} onPress={handleSubmit(onSubmit)}>
            <PrimaryButtonText>{apiResponse.loading ? buttonSending : button}</PrimaryButtonText>
        </PrimaryButton>
    </FormView>
    {manageImg && (
        <Modal
            title={uploadImgText}
            isVisible={isImgModalVisible}
            onClose={() => setIsImgModalVisible(false)}>
            {renderActionBtns()}
        </Modal>
    )}    
    </>
  );
}

export default FormTemplate;
