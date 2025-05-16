'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  StylesMain,
  StylesForm,
  StylesTitle,
  StylesInput,
  StylesButton,
  StylesError,
  StylesSuccess,
  StylesLink
} from './login.style'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Verificar se já existe um usuário logado
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/dashboard')
    }
  }, [router])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess('')
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Simular delay de API
      setTimeout(() => {
        // Buscar usuários do localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(
          user => user.email === formData.email && user.password === formData.password
        )
        
        if (user) {
          // Salvar usuário logado no localStorage
          localStorage.setItem('user', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
          }))
          
          setSuccess('Login realizado com sucesso!')
          setIsSubmitting(false)
          
          // Redirecionar para dashboard após 1 segundo
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        } else {
          setErrors({ 
            email: 'Email ou senha inválidos',
            password: 'Email ou senha inválidos'
          })
          setIsSubmitting(false)
        }
      }, 1000)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro do campo quando ele é alterado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <StylesMain>
      <StylesForm onSubmit={handleSubmit}>
        <StylesTitle>Login</StylesTitle>
        
        <div>
          <StylesInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <StylesError>{errors.email}</StylesError>}
        </div>
        
        <div>
          <StylesInput
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <StylesError>{errors.password}</StylesError>}
        </div>
        
        <StylesButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </StylesButton>
        
        {success && <StylesSuccess>{success}</StylesSuccess>}
        
        <StylesLink>
          Não tem uma conta? <Link href="/register">Cadastre-se</Link>
        </StylesLink>
      </StylesForm>
    </StylesMain>
  )
} 