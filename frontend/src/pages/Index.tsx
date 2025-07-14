import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, Users, Sparkles, ArrowRight } from 'lucide-react'

const Index = () => {
  return (
    <div className="container-main">
      <div className="card-company w-full max-w-4xl text-center">
        <div className="mb-12">
          <div className="p-6 bg-primary/20 rounded-2xl w-fit mx-auto mb-8">
            <Building2 className="w-16 h-16 text-primary mx-auto" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
            Sistema de Gestão
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gerencie empresas e colaboradores de forma eficiente e moderna. 
            Interface redesenhada para melhor experiência do usuário.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/companies" className="btn-primary text-lg px-8 py-4">
              <Building2 className="w-5 h-5" />
              Ver Empresas
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link to="/companies/new" className="btn-secondary text-lg px-8 py-4">
              <Sparkles className="w-5 h-5" />
              Nova Empresa
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background/30 rounded-xl p-6 border border-border/30">
            <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-4">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Gestão de Empresas</h3>
            <p className="text-sm text-muted-foreground">
              Cadastre e gerencie empresas com interface intuitiva
            </p>
          </div>
          
          <div className="bg-background/30 rounded-xl p-6 border border-border/30">
            <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Controle de Colaboradores</h3>
            <p className="text-sm text-muted-foreground">
              Adicione funcionários e organize hierarquias
            </p>
          </div>
          
          <div className="bg-background/30 rounded-xl p-6 border border-border/30">
            <div className="p-3 bg-primary/20 rounded-lg w-fit mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Interface Moderna</h3>
            <p className="text-sm text-muted-foreground">
              Design atualizado com foco na usabilidade
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-2">
            Sistema redesenhado com React e Tailwind CSS
          </p>
          <p className="text-xs text-muted-foreground">
            Interface melhorada mantendo toda a funcionalidade original
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
